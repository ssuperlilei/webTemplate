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
        text: '组件（@ssuperlilei-lib/ui）',
        items: [
          { text: 'ConfigProvider 组件', link: '/packages/ui/configProvider' },
          { text: 'PasswordInput 组件', link: '/packages/ui/passwordInput' },
          { text: 'table 组件', link: '/packages/ui/table' },
          { text: 'form 组件', link: '/packages/ui/form' },
        ],
      },
      {
        text: 'Hooks（@ssuperlilei-lib/hooks）',
        items: [{ text: 'useCounter 计数器', link: '/packages/hooks/useCounter' }],
      },
      {
        text: '指令（@ssuperlilei-lib/directives）',
        items: [{ text: 'vFocus 聚焦', link: '/packages/directives/vFocus' }],
      },
      {
        text: '工具函数（@ssuperlilei-lib/utils）',
        items: [
          { text: '类型方法', link: '/packages/utils/types' },
          { text: '常用方法', link: '/packages/utils/func' },
        ],
      },
      {
        text: 'i18n（@ssuperlilei-lib/i18n）',
        items: [{ text: '多语言', link: '/packages/i18n/index' }],
      },
      {
        text: '关键代码',
        items: [{ text: '不定高度虚拟列表', link: '/packages/keyCode/virtualized' }],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/ssuperlilei/webTemplate' }],
  },
});
