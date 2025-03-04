# @ssuperlilei/ui

Vue 3 组件库，基于 Vue 3 + TypeScript 构建的现代化组件库。

## 特性

- 🚀 基于 Vue 3 + TypeScript 构建
- 📦 支持按需引入
- 💪 使用 Monorepo + pnpm 工作区管理
- 📝 完整的类型定义
- 🔧 完善的开发工具链

## 安装

```bash
npm install @ssuperlilei/ui

yarn add @ssuperlilei/ui

pnpm add @ssuperlilei/ui
```

## 快速开始

### 全局引入

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

import LUI from '@ssuperlilei/ui';
import '@ssuperlilei/ui/style.css';

const app = createApp(App);
app.use(LUI);
app.mount('#app');
```

### 按需引入

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

import { LPasswordInput } from '@ssuperlilei/ui';

const app = createApp(App);
app.component('LPasswordInput', LPasswordInput);
app.mount('#app');
```

## 使用示例

```vue
<template>
  <LPasswordInput v-model:value="password"></LPasswordInput>
</template>

<script setup lang="ts">
import { LPasswordInput } from '@ssuperlilei/ui';
import { ref } from 'vue';
const password = ref<string>('123456');
</script>
```
