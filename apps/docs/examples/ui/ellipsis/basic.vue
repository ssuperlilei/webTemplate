<template>
  <!-- 单行省略 -->
  <div style="width: 200px">
    <l-ellipsis>
      这是一段很长的文本，当它超出容器宽度时会自动显示省略号并在鼠标悬停时显示完整内容
    </l-ellipsis>
  </div>
  <!-- 多行省略 -->
  <div style="width: 200px">
    <l-ellipsis :double="true">
      这是一段很长的文本内容，当它超出容器宽度两行时会自动显示省略号，并在鼠标悬停时通过Tooltip显示完整的文本内容
    </l-ellipsis>
  </div>
  <!-- 不显示Tooltip -->
  <div style="width: 200px">
    <l-ellipsis :tooltip="false">
      这是一段很长的文本，超出部分会显示省略号但不会显示Tooltip
    </l-ellipsis>
  </div>
  <!-- 考虑兄弟元素宽度 当 Ellipsis 组件与其他元素并排显示时，可以通过 `otherWidth` 属性指定其他元素占用的宽度，以便更准确地判断是否需要显示省略号 -->
  <div style="display: flex; width: 200px">
    <l-ellipsis :other-width="50">这是一段考虑了兄弟元素宽度的文本</l-ellipsis>
    <span style="width: 50px">标签</span>
  </div>
</template>

<script setup>
import { LEllipsis } from '@ssuperlilei/ui';
</script>
