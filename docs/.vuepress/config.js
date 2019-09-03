/*
 * @Author: 李永兴
 * @Email: mrli2016@126.com
 * @Date: 2019-03-08 11:25:17
 * @LastEditTime: 2019-09-03 09:49:51
 * @Description: 
 */
module.exports = {
  theme: 'reco',
  title: 'Mrli2016',
  description: '念念不忘 必有回响',
  themeConfig: {
    type: 'blog',
    logo: '/portrait.png',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认文案 “标签”
      }
    },

    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'Mrli2016/my-vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '我的GitHub',

    // 以下为可选的编辑链接选项
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    sidebarDepth: 2, // 侧边栏显示2级
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我修改错误！',
    lastUpdated: '最后更新时间', // string | boolean  
  }
}