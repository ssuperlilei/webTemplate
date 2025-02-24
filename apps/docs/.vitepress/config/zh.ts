import { defineConfig } from 'vitepress';

export const zh = defineConfig({
  lang: 'zh-Hans',
  title: '组件库模板文档',
  description: '一个基于 Vue3 的组件库和工具集',
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      // { text: '其他', link: '/markdown-examples' },
      // { text: '博客', link: 'https://ssuperlilei.github.io/my-blog' },
      {
        text: '更多',
        items: [
          {
            text: '更新日志',
            link: 'https://github.com/ssuperlilei/webTemplate/blob/master/CHANGELOG.md',
          },
          // {
          //   text: '参与贡献',
          //   link: '',
          // },
        ],
      },
    ],
    sidebar: [
      {
        text: '快速开始',
        items: [{ text: '介绍', link: '/guide/index' }],
      },
      {
        text: '组件（@ll_lib/ui）',
        items: [
          { text: 'ConfigProvider 组件', link: '/packages/ui/configProvider' },
          // { text: 'Dialog 对话框', link: '/packages/ui/dialog' },
          { text: 'PasswordInput 组件', link: '/packages/ui/passwordInput' },
          { text: 'form 组件', link: '/packages/ui/form' },
        ],
      },
      {
        text: 'Hooks（@ll_lib/hooks）',
        items: [{ text: 'useCounter 计数器', link: '/packages/hooks/useCounter' }],
      },
      {
        text: '指令（@ll_lib/directives）',
        items: [{ text: 'vFocus 聚焦', link: '/packages/directives/vFocus' }],
      },
      {
        text: '工具函数（@ll_lib/utils）',
        items: [{ text: '字符串工具', link: '/packages/utils/string' }],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/ssuperlilei/webTemplate' }],
  },
});
