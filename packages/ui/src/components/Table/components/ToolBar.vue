<template>
  <div class="ll-tool-bar">
    <slot name="headerTitle" v-bind="tableInstance">
      <div class="ll-tool-bar-title">
        {{ props.title }}
        <LLHelp v-if="props.titleTooltip" class="ll-tool-bar-help" :text="props.titleTooltip" />
      </div>
    </slot>

    <div>
      <Space :size="16">
        <slot name="toolbar" v-bind="tableInstance" />
        <template v-if="props.showRefresh">
          <Divider type="vertical" />
          <Refresh />
        </template>
      </Space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Divider, Space } from 'ant-design-vue';
import LLHelp from '~/components/Form/components/Help.vue';
import { Refresh } from '.';
import type { PropType } from 'vue';
import type { TableActionType } from '../Table.types';

defineOptions({
  name: 'LLToolBar',
});

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  titleTooltip: {
    type: String,
    default: '',
  },
  showRefresh: {
    type: Boolean,
    default: true,
  },
  /** 动态表格实例 */
  tableInstance: {
    type: Object as PropType<TableActionType>,
    default: null,
  },
});
</script>
