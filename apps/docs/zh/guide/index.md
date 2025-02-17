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
npm install @ll_lib/ui @ll_lib/utils @ll_lib/hooks @ll_lib/directives
```

```bash [yarn]
yarn add @ll_lib/ui @ll_lib/utils @ll_lib/hooks @ll_lib/directives
```

```bash [pnpm]
pnpm add @ll_lib/ui @ll_lib/utils @ll_lib/hooks @ll_lib/directives
```

```bash [bun]
bun add @ll_lib/ui @ll_lib/utils @ll_lib/hooks @ll_lib/directives
```

:::

## 使用

### UI 组件

```ts
// 全局引入
import { createApp } from 'vue';
import UI from '@ll_lib/ui';
import '@ll_lib/ui/style.css';
const app = createApp(App);
app.use(UI);
//  tsconfig.json 还需要添加以下配置以获得类型提示：
//  "types": ["@ll_lib/ui/global.d.ts"]

// 按需引入
import { Button } from '@ll_lib/ui';
import '@ll_lib/ui/style.css';
const app = createApp(App);
app.use(Button);
```

### 工具函数

```ts
import { isString } from '@ll_lib/utils';
console.log(isString('hello')); // true
```

### Hooks

```ts
import { useCounter } from '@ll_lib/hooks';
const { count, increment, decrement } = useCounter();
```

### 指令

```ts
import { vFocus } from '@ll_lib/directives';
// 全局引入
app.directive('focus', vFocus);

// 按需引入
import { vFocus } from '@ll_lib/directives';
app.directive('focus', vFocus);
```
