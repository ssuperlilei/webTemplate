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
      { text: '个人简历', link: '/resume' },
      { text: '博客', link: '/blog/iframe' },
      {
        text: '更多',
        items: [
          {
            text: '更新日志',
            link: 'https://github.com/ssuperlilei/webTemplate/blob/master/CHANGELOG.md',
          },
        ],
      },
    ],
    sidebar: {
      '/guide': [
        {
          text: '快速开始',
          items: [{ text: '介绍', link: '/guide/index' }],
        },
        {
          text: '组件（@ssuperlilei/ui）',
          items: [
            { text: 'ConfigProvider 组件', link: '/guide/ui/configProvider' },
            { text: 'PasswordInput 组件', link: '/guide/ui/passwordInput' },
            { text: 'table 组件', link: '/guide/ui/table' },
            { text: 'form 组件', link: '/guide/ui/form' },
            { text: 'modalForm 组件', link: '/guide/ui/modalForm' },
            { text: '手写签名组件', link: '/guide/ui/signature' },
          ],
        },
        {
          text: 'Hooks（@ssuperlilei/hooks）',
          items: [
            { text: 'useCounter 计数器', link: '/guide/hooks/useCounter' },
            { text: 'useDrag 拖拽', link: '/guide/hooks/useDrag' },
          ],
        },
        {
          text: '指令（@ssuperlilei/directives）',
          items: [{ text: 'vFocus 聚焦', link: '/guide/directives/vFocus' }],
        },
        {
          text: '工具函数（@ssuperlilei/utils）',
          items: [
            { text: '类型方法', link: '/guide/utils/types' },
            { text: '常用方法', link: '/guide/utils/func' },
          ],
        },
        {
          text: 'i18n（@ssuperlilei/i18n）',
          items: [{ text: '多语言', link: '/guide/i18n/index' }],
        },
        {
          text: '关键代码',
          items: [{ text: '不定高度虚拟列表', link: '/guide/keyCode/virtualized' }],
        },
      ],
      '/blog': [
        {
          text: '杂知识',
          items: [
            { text: 'Git 的技巧', link: '/blog/git' },
            { text: 'iframe 微前端问题', link: '/blog/iframe' },
            { text: '删除 node_modules', link: '/blog/quickDeleteNodeModules' },
            { text: 'vue3 组件封装技巧', link: '/blog/componentSkill' },
            { text: 'uni-app 自动更新', link: '/blog/autoUpdate' },
          ],
        },
      ],
      '/resume': [],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/ssuperlilei/webTemplate' }],
  },
});
