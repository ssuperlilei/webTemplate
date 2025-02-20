import { defineConfig } from 'vitepress';
import { shared } from './config/shared';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { en } from './config/en';
import { zh } from './config/zh';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...shared,
  locales: {
    root: { label: '简体中文', ...zh },
    en: { label: 'English', ...en },
  },
  vite: {
    plugins: [vueJsx() as any],
  },
});
