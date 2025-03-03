# vFocus

> 聚焦指令

## 基础用法

<demo vue="directives/vFocus/basic.vue" />

## 全局注册

在 `main.js` 中全局注册 `vFocus` 指令：

```js
import { globalRegister } from '@ssuperlilei-lib/directives';

const app = createApp(App);
// globalRegister(app, ['vFocus']); // 注册 vFocus 指令
globalRegister(app); // 注册所有指令 包含的指令在 DirectiveKeys 中定义
app.mount('#app');
```
