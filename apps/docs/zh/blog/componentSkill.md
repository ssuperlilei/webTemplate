# 组件封装技巧

## 1. 向子组件传递插槽

以前我可能是这样循环插槽实现透传的：

```vue
<el-input v-model="model">
    <template v-for="(_, slot) in $slots" :key="slot" v-slot:[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps"></slot>
    </template>
  </el-input>
```

现在我会这样写：

```vue
<component :is="h(ElInput, $attrs, $slots)" v-model="model"></component>
```

## 2. 获取子组件的 ref

之前的自己的写法有点蠢的具体的做法是在子组件创建一个 getRef 的函数把 ref 暴露出去,父组件调用 getRef 方法后在执行子组件方法的调用,大概是下边这样的：

```vue
<script setup lang="ts">
import { h, ref } from 'vue';
import { ElInput } from 'element-plus';
const model = defineModel();

const inputRef = ref();

function getRef() {
  return inputRef.value;
}

defineExpose({
  getRef,
});
</script>

<template>
  <component ref="inputRef" :is="h(ElInput, $attrs, $slots)" v-model="model"></component>
</template>

<style lang="scss" scoped></style>
```

现在我会这样写：

```vue
<script setup lang="ts">
import { h, ref } from 'vue';
import { ElInput } from 'element-plus';
const model = defineModel();

const inputRef = ref();

defineExpose(
  new Proxy(
    {},
    {
      get(_target, prop) {
        return inputRef.value?.[prop];
      },
      has(_target, prop) {
        return prop in inputRef.value;
      },
    },
  ),
);
</script>

<template>
  <component :is="h(ElInput, $attrs, $slots)" v-model="model" ref="inputRef"></component>
</template>

<style lang="scss" scoped></style>
```
