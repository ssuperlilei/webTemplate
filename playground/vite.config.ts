import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
      // 使用本地UI库，ui组件修改实时变化，提高调试效率。
      '~@ssuperlilei/ui': resolve(import.meta.dirname, '../packages/ui/src'),
      '~@ssuperlilei/directives': resolve(import.meta.dirname, '../packages/directives/src'),
      '~@ssuperlilei/hooks': resolve(import.meta.dirname, '../packages/hooks/src'),
      '~': resolve(import.meta.dirname, '../packages/ui/src'),
    },
  },
  server: {
    port: 4444,
  },
  optimizeDeps: {
    include: ['vue', 'ant-design-vue'],
  },
});
