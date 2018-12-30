---
tags:
- nginx
- ssl
---
# nginx配置ssl实现https访问 小白文

刚刚部署完服务器后的我满怀欣喜地访问自己的网站，看哪都哪满意。但是兴奋感一过发现，诶，为什么浏览器左上角会提示不安全？想了想，不行，我也要搞个https来，我也要上锁！
![](https://user-gold-cdn.xitu.io/2018/11/30/16764f298df453ff?w=61&h=57&f=jpeg&s=9677)
> HTTP协议以明文方式发送内容，不提供任何方式的数据加密。为了数据传输的安全，HTTPS在HTTP的基础上加入了SSL协议，SSL依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。

## 申请证书
在这里，我直接申请腾讯云的免费证书。这里需要注意下，这亚洲诚信机构颁发的免费证书只能一个域名使用，子域名那些需要另外申请。别说，这腾讯里面申请还挺快的，十多分钟就通过了。下载的是一个zip文件，解压后打开里面的Nginx文件夹，把1_XXX.com_bundle.crt跟2_XXX.com.key文件复制下来。
## 打开nginx配置文件
不知道nginx文件位置的话可以通过whereis nginx命令来查找。
![](https://user-gold-cdn.xitu.io/2018/11/30/16764f32efbf16f2?w=698&h=38&f=jpeg&s=18400)
我的配置文件在/ect/nginx，现在把刚才的两个证书文件复制过来，待会直接配置使用就行了。nginx的配置文件是nginx.conf，里面的配置内容有以下，为了容易明白，我都加上了注释。
```
# 运行用户，默认即是nginx，可以不进行设置
user  nginx;
#Nginx进程，一般设置为和CPU核数一样
worker_processes  1;

#错误日志存放目录
error_log  /var/log/nginx/error.log warn;
#进程pid存放位置
pid        /var/run/nginx.pid;

events {
    worker_connections  1024; # 单个后台进程的最大并发数
}

http {
    include       /etc/nginx/mime.types; #文件扩展名与类型映射表
    default_type  application/octet-stream; #默认文件类型
    #设置日志模式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main; #nginx访问日志存放位置

    sendfile        on; #开启高效传输模式
    #tcp_nopush     on; #减少网络报文段的数量

    keepalive_timeout  65; #保持连接的时间，也叫超时时间

    #gzip  on; #开启gzip压缩

    include /etc/nginx/conf.d/*.conf; #包含的子配置项位置和文件
}
```
大致看一下就好了，这是全局配置。为了更好管理，我们还是在最后一行声明的/etc/nginx/conf.d文件夹里进行子项目配置。
打开里面的default.conf
```
#设定虚拟主机配置
server {
  #侦听443端口，这个是ssl访问端口
  listen    443;
  #定义使用 访问域名
  server_name  XXX.com;
  #定义服务器的默认网站根目录位置
  root /web/www/website/dist;  

  #设定本虚拟主机的访问日志
  access_log  logs/nginx.access.log  main;

  # 这些都是腾讯云推荐的配置，直接拿来用就行了，只是修改证书的路径，注意这些路径是相对于/etc/nginx/nginx.conf文件位置
  ssl on;
  ssl_certificate 1_XXX.com_bundle.crt;
  ssl_certificate_key 2_XXX.com.key;
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配置
  ssl_prefer_server_ciphers on;

  #默认请求
  location / {     
  root /web/www/website/dist;      
      #定义首页索引文件的名称
      index index.html;
  }

  #静态文件，nginx自己处理
  location ~ ^/(images|javascript|js|css|flash|media|static)/ {
      #过期30天，静态文件不怎么更新，过期可以设大一点，
      #如果频繁更新，则可以设置得小一点。
      expires 30d;
  }

  #禁止访问 .htxxx 文件
  #    location ~ /.ht {
  #    deny all;
  #}

}
server
{
  # 80端口是http正常访问的接口
  listen 80;
  server_name XXX.com;
  # 在这里，我做了https全加密处理，在访问http的时候自动跳转到https
  rewrite ^(.*) https://$host$1 permanent;
}
```
唔，配置基本就这些，挺简单的吧。小白福利。
![](https://user-gold-cdn.xitu.io/2018/11/30/16764f3d81b52300?w=53&h=53&f=jpeg&s=2009)
然后我们配置文件写好后用nginx测试一下
```
nginx -t
```
![](https://user-gold-cdn.xitu.io/2018/11/30/16764f455aca8a72?w=483&h=53&f=jpeg&s=18374)
妥妥的，这个过了后就能重启nginx生效了。
> 这里需要注意下，导入新的证书后需要重启而不是重载，nginx -s reload是普通修改配置重载。

```
# 停止nginx
nginx -s stop
# 启动
nginx
```
重启后再次访问自己的网站，啧啧，完美，左上角加上锁，提示安全的连接。诶，搞定，开心。

## nginx日常操作命令
* nginx -t 测试配置文件
* nginx -s reload 修改配置后重载生效
* nginx -s reopen 重新打开日志文件
* nginx -s stop 快速停止
* nginx -s quit

查看nginx进程
ps -ef | grep nginx
