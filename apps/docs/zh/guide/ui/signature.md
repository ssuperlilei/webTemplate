# signature 签名组件

手写签名组件，自适应宽高。提供简便的绘制、保存和清空功能。

## 基础用法

<demo vue="ui/signature/basic.vue" />

## 属性

| 属性名          | 说明     | 类型    | 默认值  |
| --------------- | -------- | ------- | ------- |
| lineWidth       | 线条宽度 | number  | 2       |
| lineColor       | 线条颜色 | string  | #000000 |
| backgroundColor | 背景颜色 | string  | #ffffff |
| disabled        | 是否禁用 | boolean | false   |

## 事件

| 事件名        | 说明               | 回调参数                          |
| ------------- | ------------------ | --------------------------------- |
| save          | 保存签名时触发     | data: string (签名的 base64 编码) |
| clear         | 清除签名时触发     | -                                 |
| start-drawing | 开始绘制时触发     | -                                 |
| end-drawing   | 结束绘制时触发     | -                                 |
| change        | 签名内容变化时触发 | isEmpty: boolean (是否为空)       |

## 方法

| 方法名    | 说明                     | 参数 | 返回值  |
| --------- | ------------------------ | ---- | ------- |
| clear     | 清除签名                 | -    | -       |
| save      | 保存签名并触发 save 事件 | -    | -       |
| isEmpty   | 检查签名是否为空         | -    | boolean |
| getBase64 | 获取签名的 base64 编码   | -    | string  |

## 自定义样式示例

可以通过属性自定义签名组件的样式：

```vue
<template>
  <LSignature :line-width="5" :line-color="'#ff0000'" :background-color="'#f5f5f5'" />
</template>
```

## 保存与清除示例

```vue
<template>
  <div class="signature-demo">
    <LSignature ref="signatureRef" @change="handleChange" />
    <div class="buttons">
      <button @click="handleClear">清除</button>
      <button @click="handleSave" :disabled="isEmpty">保存</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const signatureRef = ref(null);
const isEmpty = ref(true);

const handleClear = () => {
  signatureRef.value.clear();
};

const handleSave = () => {
  signatureRef.value.save();
};

const handleChange = (empty) => {
  isEmpty.value = empty;
};
</script>

<style>
.signature-demo {
  width: 100%;
  height: 200px;
}
.buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
</style>
```
