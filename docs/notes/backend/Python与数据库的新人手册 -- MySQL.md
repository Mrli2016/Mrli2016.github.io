---
tags:
- mysql
- python
---
# Python与数据库的新人手册 -- MySQL

![](./images/mysql/mysql_logo.jpg)
Python支持的数据库有很多，`MySQL`作为主流数据库之一，我们不妨了解下它们之间的`小故事`
Python操作MySQL的库有三个，`python-MySQL（MySQLdb）`，`PyMySQL`跟`SQLAlchemy`。
* python2中一般使用`python-MySQL（MySQLdb）`，核心由C语言打造，性能最好，缺点是安装复杂，已停止更新，不支持python3。
* `PyMySQL`为代替它而生，纯python打造，安装方便，支持python3。
* `SQLAlchemy`是一个ORM框架，ORM框架的作用就是把数据库表的一行记录与一个对象互相做自动转换，它本身无法操作数据库，而是要依赖于MySQLdb、PyMySQL等第三方库来完成，目前SQLAlchemy在Web编程领域应用广泛。

本文将主要拿`SQLAlchemy`来进行了解学习。

## 安装工具
首先安装基本的数据库驱动`pymysql`
``` sh
pip3 install pymysql
```
然后安装ORM框架`SQLAlchemy`
```sh
pip3 install sqlalchemy
```
日常工作中，如果不想每次通过命令行来查看数据的话。推荐安装`Navicat for MySQL`，通过这个图形化工具能够方便快捷地操作数据库，实时查询数据。

![](./images/mysql/NavicatForMySQL.png)



## 初始化数据库
安装好必要工具后，我们开始尝试创建个用户数据`user`表来。
首先，使用`SQLAlchemy`连接数据库并定义表结构初始化DBSession。
```python
# 导入SQLAlchemy
from sqlalchemy import Column, BIGINT, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 创建基类
Base = declarative_base()

# 初始化数据库连接:
# '数据库类型+数据库驱动名称://用户名:密码@数据库地址:端口号/数据库名'
engine = create_engine('mysql+pymysql://root:123123@mysql:3306/test')

# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
# 创建session对象:
session = DBSession()

# 数据库操作方法
# 初始化数据库
def init_db():
    Base.metadata.create_all(engine)
# 删除数据库
def drop_db():
    Base.metadata.drop_all(engine)
```
建立`user`数据表模型：
```python
# 定义user类
class User(Base):
    # 表名
    __tablename__ = "user"

    # 表的结构
    # 设置id为主键 并自增长
    id = Column(BIGINT, primary_key=True, autoincrement=True)
    name = Column(String(20))
    gender = Column(String(2))

# 正式初始化数据库，如果没有user表的话，这里将自动创建
init_db()
```
这里有个需要注意的地方就是在初始化数据库之前需要先定义`user`数据表模型，否则的话无法正常创建`user`数据表。
`session`(会话)，可以看成一个管理数据库持久连接的对象，后面的操作都将基于`session`对象进行。
> 如果使用INT自增类型，那么当一张表的记录数超过2147483647（约21亿）时，会达到上限而出错。使用BIGINT自增类型则可以最多约922亿亿条记录。

## 增删改查操作
### 增
初始化ORM对象后，我们插入一条记录试试。
```python
# 创建新User对象:
new_user = User(name='mrlizi', gender='man')
# 添加到session:
session.add(new_user)
# 批量添加
session.add_all([
    User(name='子非鱼', gender='M'),
    User(name='虞姬', gender='F'),
    User(name='花木兰', gender='F')
])
# 提交即保存到数据库:
session.commit()
```
结果：

![](./images/mysql/add.jpg)

### 查
`Session`的`query`函数会返回一个Query对象。query函数可以接受多种参数类型。
```python
# query: 输出所有的用户名
result = session.query(User.name)
# order: 按倒序输出所有用户
result = session.query(User).order_by(User.id.desc())
result = session.query(User).order_by(-User.id)
# label: 自定义字段名,查询结果可通过item.my_name来获取用户名
for item in session.query(User.name.label('my_name')).all()
# filter和filter_by: 筛选用户名为'mrlizi'的用户
result = session.query(User).filter(User.name=='mrlizi').one()
result = session.query(User).filter_by(name='mrlizi').one()
# offset和limit：组合起来可做分页查询(通过python的切片其实也一样)，下面的两种语句的查询结果是相同的
result = session.query(User).offset(2).limit(1).all()
result = session.query(User)[1:3]

# AND: 与查询      
result = session.query(User).filter(and_(User.name=='mrlizi', User.gender=='M')).all()
result = session.query(User).filter(User.name=='mrlizi', User.gender=='M')
result = session.query(User).filter(User.name=='mrlizi').filter(User.gender=='M').all()
# OR: 或查询
result = session.query(User).filter(or_(User.name == '子非鱼', User.name == '花木兰'))
# 模糊查询
result = session.query(User).filter(User.name.like('子%')).all()
```
基本日常用到的查询方法就是这些，面向对象操作的用法都比较灵活多变，大家可以根据不同的场景自由组合。
### 改
相比去查询来讲，修改就显得简单很多，找到命中的记录，然后通过`update`方法来进行修改。
`update`方法的`synchronize_session`参数用于在更新数据后是否对当前的session进行更新，
`synchronize_session` = False 不同步更新当前session
`synchronize_session` = `'fetch'` 更新之前从数据库中拉取实时数据，更新到session对象
`synchronize_session` = `'evaluate'` 更新之前先记录符合的对象，更新完后对记录的对象进行删除。（意思是不与数据库进行同步更新，仅更新当前的session记录）
```python
# 方法一
session.query(User).filter(User.name == 'mrlizi').update({'name': '李白'})
# 方法二
user = session.query(User).filter(User.name == '李白').first()
user.name = '铠'
# 操作方式
result = session.query(User).filter(User.name == '虞姬').update({User.name: '孙尚香'}, synchronize_session='fetch')
# 提交
session.commit()
```
### 删
删除的话，无非就是`查询`到目标记录，然后进行删除。
```python
# 使用查询语句，filter是where条件，最后调用delete()进行删除记录:
session.query(User).filter_by(name="铠").delete()
session.commit()
```
## 关联表查询
`MySQL`作为关系型数据库，可以通过设置外键来进行多个表互相关联查询。相应的，`SQLAlchemy`也提供了对象之间的一对一、一对多、多对多关联功能。
### 一对多
在`SQLAlchemy`的一对多关系中，使用`ForeignKey()`来表示表的外键，`relationship()`表示表与表之间关联的属性。
```python
def one_to_many():
    # 定义user类
    class User(Base):
        # 表名
        __tablename__ = "user"

        # 表的结构
        # 设置id为主键 并自增长
        id = Column(BIGINT, primary_key=True, autoincrement=True)
        name = Column(String(20))
        # 定义用户关注的公众号属性，指明两者的关系
        account = relationship('Account', back_populates="user")

    class Account(Base):
        __tablename__ = 'account'

        id = Column(BIGINT, primary_key=True, autoincrement=True)
        name = Column(String(20))
        # 设置外键关联到user表的:
        user_id = Column(BIGINT, ForeignKey('user.id'))
        # 定义 Account 的 user 属性，指明两者关系
        user = relationship("User", back_populates="account")

    # 清空数据库并重新初始化
    drop_db()
    init_db()

    mrlizi = User(name='mrlizi')
    mrlizi.account = [
        Account(name='攻城狮峡谷'),
        Account(name='zone7')
    ]
    session.add(mrlizi)

    result = session.query(User).filter(User.name == 'mrlizi').one()
    for item in result.account:
        print(item.name)

    result = session.query(Account).filter(Account.name == '攻城狮峡谷').one()
    print(result.user.name)

    session.commit()

one_to_many()
```
上面代码的实现过程：
* 建立一对多数据表模型
* 将之前的数据清空后重新初始化，用新的表模型创建个新的user，并添加关注的公众号account
* 增加name为mrlizi的`user`表记录，同时创建相关联的公众号信息记录。
* 通过`user`表查询相关联的公众号数据
* 通过`account`表查询相关联的用户数据

### 一对一
**一对一**其实就是两个表互相关联，我们只需要在**一对多**关系基础上的父表中使用`uselist`参数来表示。实现代码如下：
```python
def one_to_one():
    # 定义user类
    class User(Base):
        __tablename__ = "user"

        id = Column(BIGINT, primary_key=True, autoincrement=True)
        name = Column(String(20))
        account = relationship('Account', uselist=False, back_populates="user")

    # 公众号类
    class Account(Base):
        __tablename__ = 'account'

        id = Column(BIGINT, primary_key=True, autoincrement=True)
        name = Column(String(20))
        # 设置外键关联到user表的:
        user_id = Column(BIGINT, ForeignKey('user.id'))
        # 定义 Account 的 user 属性，指明两者关系
        user = relationship("User", back_populates="account")

    # 清空数据库并重新初始化
    drop_db()
    init_db()

    # 添加记录
    user = User(name='子非鱼')
    user.account = Account(name='攻城狮峡谷')
    session.add(user)
    session.commit()

    # 查询
    result = session.query(User).filter(User.name == '子非鱼').one()
    print(result.account.name)
    # 输出：
    # 攻城狮峡谷

one_to_one()
```
### 多对多
**多对多**是通过两个表之间增加一个关联的表来实现，这个关联表使用`MetaData`对象来与两个表关联，并用`ForeignKey`参数指定链接来定位到两个不同的表，两个不同的表则在`relationship()`方法中通过`secondary`参数来指定关联表。
```python
def many_to_many():
    # 关联表
    association_table = Table('association', Base.metadata,
                              Column('user_id', BIGINT, ForeignKey('user.id')),
                              Column('account_id', BIGINT, ForeignKey('account.id'))
                              )

    class User(Base):
        __tablename__ = "user"

        id = Column(BIGINT, primary_key=True, autoincrement=True)
        name = Column(String(20))
        accounts = relationship('Account', secondary=association_table, back_populates="users")

    class Account(Base):
        __tablename__ = 'account'

        id = Column(BIGINT, primary_key=True, autoincrement=True)
        name = Column(String(20))
        users = relationship("User", secondary=association_table, back_populates="accounts")

    # 清空数据库并重新初始化
    drop_db()
    init_db()
    
    # 创建记录
    user1 = User(name='子非鱼')
    user2 = User(name='zone')
    user3 = User(name='mrlizi')
    account1 = Account(name='攻城狮峡谷')
    account2 = Account(name='zone7')

    # 关联记录
    user1.accounts = [account1]
    user2.accounts = [account1, account2]
    user3.accounts = [account2]

    # 添加并保存
    session.add(user1)
    session.add(user2)
    session.add(user3)
    session.commit()

    # 双向查询
    result1 = session.query(User).filter(User.name == 'zone').one()
    for item in result1.accounts:
        print(item.name)
    result2 = session.query(Account).filter(Account.name == '攻城狮峡谷').one()
    for item in result2.users:
        print(item.name)

many_to_many()
```

## 总结
MySQL作为主流的数据库之一，我们不一定说要多深入去研究它的使用，但起码的了解还是要有的。而且python中使用MySQL还是挺简单的，代码敲着敲着就会了。