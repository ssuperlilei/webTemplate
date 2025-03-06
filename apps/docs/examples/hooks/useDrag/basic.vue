<template>
  <div ref="dragEl" class="drag-element" @mousedown="handleMouseDown">可拖拽元素</div>
</template>

<script setup>
import { useDrag } from '@ssuperlilei/hooks';
import { onMounted, onUnmounted, ref } from 'vue';

const dragEl = (ref < HTMLElement) | (null > null);
const { initDrag, handleMouseDown, closeMouseListener } = useDrag();

onMounted(() => {
  if (dragEl.value) {
    initDrag(dragEl.value);
  }
});

onUnmounted(() => {
  closeMouseListener();
});
</script>
