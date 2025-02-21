import { defineConfig } from 'vitepress';

export const en = defineConfig({
  lang: 'en-US',
  title: 'Library Template Doc',
  description: 'A Vue3-based Component Library and Utility Collection',
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Others', link: '/markdown-examples' },
      { text: 'Blog', link: 'https://ssuperlilei.github.io/my-blog' },
      {
        text: 'More',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/ssuperlilei/webTemplate/blob/master/CHANGELOG.md',
          },
          // {
          //   text: 'Contribute',
          //   link: '',
          // },
        ],
      },
    ],
    sidebar: [
      {
        text: 'Quick Start',
        items: [{ text: 'Introduction', link: 'en/guide/index' }],
      },
      {
        text: 'Components (@ll_lib/ui)',
        items: [
          { text: 'Button', link: 'en/packages/ui/button' },
          { text: 'Dialog', link: 'en/packages/ui/dialog' },
        ],
      },
      {
        text: 'Hooks (@ll_lib/hooks)',
        items: [{ text: 'useCounter', link: 'en/packages/hooks/useCounter' }],
      },
      {
        text: 'Directives (@ll_lib/directives)',
        items: [{ text: 'vFocus', link: 'en/packages/directives/vFocus' }],
      },
      {
        text: 'Utilities (@ll_lib/utils)',
        items: [{ text: 'String Utils', link: 'en/packages/utils/string' }],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/ssuperlilei/webTemplate' }],
  },
});
