### 
# @Author: 李永兴
 # @Email: mrli2016@126.com
 # @Date: 2019-05-15 09:04:35
 # @LastEditTime: 2019-09-12 11:09:02
 # @Description: 
 ###
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f https://github.com/Mrli2016/Mrli2016.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:Mrli2016/my-vuepress.git master:gh-pages

echo -e "\033[34m已发布成功 可查看链接: \033[0m"
echo -e "\033[36mhttps://mrli2016.github.io/\033[0m"

cd -