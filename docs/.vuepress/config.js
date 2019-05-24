module.exports = {
  head: [
    ['link', {
      rel: 'shortcut icon',
      type: "image/png",
      href: `/favicon.png`
    }],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no'
    }]
  ],
  title: '子非鱼',
  description: '念念不忘 必有回响',
  // theme: 'reco',
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'Mrli2016/my-vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '我的GitHub',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'Mrli2016/my-vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '指出错误',
    lastUpdated: '最后更新时间', // string | boolean
    sidebar: 'auto',
    // 显示侧边栏标题深度
    sidebarDepth: 2,
    // 显示所有标题
    displayAllHeaders: true,
    nav: [{
      text: '标签墙',
      link: '/tags/'
    }],
    logo: `/portrait.png`
  }
}