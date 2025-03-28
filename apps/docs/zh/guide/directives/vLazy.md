# v-lazy 懒加载指令

## 介绍

`v-lazy` 指令用于实现图片的懒加载功能，只有当图片进入视口或即将进入视口时才会加载图片。这种延迟加载图片的方式可以显著提高页面性能，减少不必要的网络请求，尤其适合图片密集型应用。

## 特性

- 基于 IntersectionObserver API，性能高效
- 只有当图片至少 10% 可见或在视口 100px 范围内时，才会加载图片
- 自动停止对已加载图片的观察
- 简单易用，只需添加一个指令

## 安装

```bash
# npm
npm install @ssuperlilei/directives

# yarn
yarn add @ssuperlilei/directives

# pnpm
pnpm add @ssuperlilei/directives
```

## 注册

### 全局注册

```typescript
import { createApp } from 'vue';
import { vLazy } from '@ssuperlilei/directives';
import App from './App.vue';

const app = createApp(App);
app.directive('lazy', vLazy);
app.mount('#app');
```

### 局部注册

```vue
<script setup>
import { vLazy } from '@ssuperlilei/directives';
</script>

<template>
  <img v-lazy="imageUrl" alt="Lazy loaded image" />
</template>
```

## 基本用法

只需将 `v-lazy` 指令添加到 `<img>` 标签上，并传入图片 URL 即可：

```vue
<img v-lazy="'https://example.com/image.jpg'" alt="懒加载图片" />
```

当图片进入视口或接近视口时，指令会自动设置 `src` 属性，加载图片。

## 示例

以下是一个使用 `v-lazy` 指令实现图片懒加载的示例：

::: raw
<demo class="vp-raw" vue="directives/vLazy/basic.vue" />
:::

## API 参考

### 指令参数

`v-lazy` 指令接受一个字符串参数，表示图片的 URL：

```vue
<img v-lazy="imageUrl" />
```

### 配置选项

目前 `v-lazy` 指令使用以下固定配置：

- `rootMargin`: 100px - 图片距离视口 100px 内时开始加载
- `threshold`: 0.1 - 图片 10% 可见时开始加载

## 注意事项

- `v-lazy` 指令只能用于 `<img>` 元素，用于其他元素会在控制台发出警告
- 该指令使用 IntersectionObserver API，在不支持该 API 的旧浏览器上需要提供 polyfill
- 为了更好的用户体验，建议为懒加载的图片提供加载状态的视觉反馈

## 浏览器兼容性

`v-lazy` 指令依赖于 IntersectionObserver API，该 API 在现代浏览器中得到广泛支持。如需在旧浏览器中使用，请考虑添加相应的 polyfill。
