<template>
  <span ref="ellipsisRef" class="ll-ellipsis-container">
    <Tooltip v-if="showToolTip" ref="toolTip" v-bind="mergedProps">
      <template v-for="(_, key) in slots" #[key]>
        <slot :name="key" />
      </template>
    </Tooltip>
    <span v-else-if="equalWidth"><slot /></span>
    <span v-else v-bind="spanBindValue">
      <slot />
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, useAttrs, useSlots, watchEffect } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { llEllipsisProps } from './Ellipsis.types';
import { styleFn } from './style';

defineOptions({
  name: 'LEllipsis',
});
const props = defineProps(llEllipsisProps);
const slots = useSlots() as Record<string, any>;
const attrs = useAttrs() as Record<string, any>;

// 合并 attrs 与 props，并根据是否 double 计算 class
const mergedProps = computed(() => {
  const base = { ...attrs, ...props } as Record<string, any>;
  const originalClass = attrs.class ? String(attrs.class) : '';
  base.class = props.double
    ? originalClass
      ? `${originalClass} ll-ellipsis-span ll-double-ellipsis-span`
      : 'll-double-ellipsis-span ll-ellipsis-span'
    : originalClass
      ? `${originalClass} ll-ellipsis-span`
      : 'll-ellipsis-span';
  return base;
});
// 获取 span 的绑定属性（只包含 class 和 style）
const spanBindValue = computed(() => {
  const { class: className, style } = mergedProps.value;
  return { class: className, style };
});

// 根据 tooltip 属性设置是否展示 Tooltip
const showToolTip = ref(Boolean(props.tooltip));
watchEffect(() => {
  showToolTip.value = Boolean(props.tooltip);
});

styleFn();

const equalWidth = ref(false);
const ellipsisRef = ref<HTMLElement | null>(null);
const toolTip = ref(null);

// 当组件挂载后检测 ellipsis 节点是否完全可见，从而调整展示状态
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.intersectionRatio === 1) {
      const parentWidth = entry.target.parentElement?.offsetWidth || 0;
      const childWidth = entry.target.scrollWidth;
      const otherWidth = Number(props.otherWidth) || 0;
      if (Math.floor(parentWidth) > Math.floor(childWidth + otherWidth)) {
        showToolTip.value = false;
        equalWidth.value = false;
      } else if (Math.floor(parentWidth) === Math.floor(childWidth + otherWidth)) {
        equalWidth.value = true;
        showToolTip.value = false;
      } else {
        showToolTip.value = Boolean(props.tooltip);
        equalWidth.value = false;
      }
    }
  });
  if (ellipsisRef.value) {
    observer.observe(ellipsisRef.value);
  }
});
</script>
