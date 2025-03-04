<template>
  <div style="width: 184px; padding: 12px; border-radius: 4px">
    <Input
      ref="inputRef"
      v-model:value="value"
      :placeholder="t('搜索关键字')"
      autofocus
      style="display: block; width: 160px; margin-bottom: 12px"
    />
    <Space>
      <Button style="width: 76px" @click="handleReset">{{ t('重置') }}</Button>
      <Button style="width: 76px" type="primary" @click="handleSearch">
        {{ t('搜索') }}
      </Button>
    </Space>
  </div>
</template>

<script setup lang="ts">
import { t } from '@ssuperlilei/i18n';
import { computed, ref } from 'vue';
import { Button, Input, Space } from 'ant-design-vue';

const inputRef = ref<typeof Input>();
const emit = defineEmits(['update:value', 'search', 'reset']);

const props = withDefaults(
  defineProps<{
    column: any;
    value: string | undefined;
  }>(),
  {
    column: {},
    value: '',
  },
);

const value = computed({
  get: (): string | undefined => {
    return props.value;
  },
  set: (val: string | undefined) => {
    emit('update:value', val);
  },
});

const handleSearch = () => {
  emit('search');
};

const handleReset = () => {
  value.value = void 0;
  emit('reset');
};

const focus = () => {
  inputRef.value?.focus();
};

defineExpose({
  focus,
});
</script>
