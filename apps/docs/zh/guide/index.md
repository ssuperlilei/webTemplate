# 快速开始

## 介绍

ll_lib-template 是一个基于 Vue3 的组件库和工具集模板项目，包含以下几个部分：

- UI 组件库：提供常用的 UI 组件
- 工具函数：提供常用的工具函数
- Hooks：提供可复用的组合式函数
- Directives：提供常用的指令

## 安装

使用包管理器安装：

::: code-group

```bash [npm]
npm install @ssuperlilei/ui @ssuperlilei/utils @ssuperlilei/hooks @ssuperlilei/directives
```

```bash [yarn]
yarn add @ssuperlilei/ui @ssuperlilei/utils @ssuperlilei/hooks @ssuperlilei/directives
```

```bash [pnpm]
pnpm add @ssuperlilei/ui @ssuperlilei/utils @ssuperlilei/hooks @ssuperlilei/directives
```

```bash [bun]
bun add @ssuperlilei/ui @ssuperlilei/utils @ssuperlilei/hooks @ssuperlilei/directives
```

:::

## 使用

### UI 组件

```ts
// 全局引入
import { createApp } from 'vue';
import UI from '@ssuperlilei/ui';
import '@ssuperlilei/ui/style.css';
const app = createApp(App);
app.use(UI);
//  tsconfig.json 还需要添加以下配置以获得类型提示：
//  "types": ["@ssuperlilei/ui/global.d.ts"]

// 按需引入
import { Button } from '@ssuperlilei/ui';
import '@ssuperlilei/ui/style.css';
const app = createApp(App);
app.use(Button);
```

### 工具函数

```ts
import { isString } from '@ssuperlilei/utils';
console.log(isString('hello')); // true
```

### Hooks

```ts
import { useCounter } from '@ssuperlilei/hooks';
const { count, increment, decrement } = useCounter();
```

### 指令

```ts
import { vFocus } from '@ssuperlilei/directives';
// 全局引入
app.directive('focus', vFocus);

// 按需引入
import { vFocus } from '@ssuperlilei/directives';
app.directive('focus', vFocus);
```
