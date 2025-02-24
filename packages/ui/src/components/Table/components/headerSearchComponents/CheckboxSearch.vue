<template>
  <div style="width: 184px; padding: 12px; border-radius: 4px">
    <CheckboxGroup v-model:value="value" v-bind="checkboxProps" @change="handelChange">
      <Row>
        <Space direction="vertical" :size="12">
          <Col
            v-for="item in props.column?.headerSearchComponentProps.options"
            :key="item.value"
            span="24"
          >
            <Checkbox :value="item.value">{{ item.label }}</Checkbox>
          </Col>
        </Space>
      </Row>
    </CheckboxGroup>
    <div :style="buttonBoxStyle">
      <Space>
        <Button style="width: 76px" @click="handleReset">
          {{ t('重置') }}
        </Button>
        <Button style="width: 76px" type="primary" @click="handleSearch">
          {{ t('搜索') }}
        </Button>
      </Space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from '@ll_lib/i18n';
import { computed } from 'vue';
import { Button, Checkbox, CheckboxGroup, Col, Row, Space } from 'ant-design-vue';

const buttonBoxStyle = `padding-top: 12px;
  box-sizing: border-box;
  margin-top: 12px;
  border-top: 1px solid var(--ll-second-level-border-color);`;

const emit = defineEmits(['update:value', 'search', 'reset']);

const props = withDefaults(
  defineProps<{
    column: any;
    value: Array<string | number | boolean> | undefined;
  }>(),
  {
    column: () => {},
    value: () => [],
  },
);

const value = computed({
  get: () => {
    return props.value;
  },
  set: (val: undefined | Array<string | number | boolean>) => {
    emit('update:value', val);
  },
});

const checkboxProps = computed(() => {
  return {
    style: { width: '100%' },
  };
});

const handelChange = (val: Array<string | number | boolean>) => {
  if (val && val.length === 0) {
    value.value = undefined;
  } else {
    value.value = val;
  }
};
const handleSearch = () => {
  emit('search');
};

const handleReset = () => {
  value.value = undefined;
  emit('reset');
};
</script>
