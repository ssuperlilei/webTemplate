<template>
  <div :key="tableKey" class="ll-table">
    <LForm
      v-if="search"
      ref="queryFormRef"
      submit-on-reset
      :class="[
        props.showSearchBorder ? 'll-table-form-border' : '',
        !props.showToolBar && props.showSearchBorder ? 'has-margin-bottom' : '',
      ]"
      v-bind="getFormProps"
      :table-instance="tableAction"
      @toggle-advanced="(e: any) => $emit('toggle-advanced', e)"
      @submit="handleSubmit"
      @reset="handleReset"
    >
      <template v-for="item of getFormSlotKeys" #[replaceFormSlotKey(item)]="data">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </LForm>
    <div :class="['ll-table-container', props.virtualScroll ? virtualizedClass : '']">
      <ToolBar
        v-if="showToolBar"
        :title="headerTitle"
        :title-tooltip="titleTooltip"
        :table-instance="tableAction"
        :show-refresh="showRefresh"
      >
        <template v-for="name of Object.keys($slots)" #[name]="data">
          <slot :name="name" v-bind="data || {}" />
        </template>
      </ToolBar>
      <Table
        ref="tableRef"
        v-bind="getBindValues"
        :columns="innerColumns"
        :data-source="renderList"
        @resize-column="handleResizeColumn"
        @change="handleTableChange"
      >
        <template #customFilterIcon="{ column }">
          <SearchOutlined
            :style="{
              color: headerSearchDataRef[column.dataIndex as keyof typeof headerSearchDataRef] ? 'var(--ll-primary-color)' : '#6C7380',
            }"
          />
        </template>
        <template
          v-if="!($slots.expandColumnTitle || $slots.expandedRowRender)"
          #headerCell="{ column }"
        >
          <span
            :style="{
              color: headerSearchDataRef[column.dataIndex as keyof typeof headerSearchDataRef] ? 'var(--ll-primary-color)' : undefined,
            }"
          >
            {{ column.title }}
          </span>
        </template>
        <template #customFilterDropdown="{ confirm, column }">
          <InputSearch
            v-if="column.headerSearchComponent === 'Input'"
            ref="headerSearchInputRef"
            v-model:value="headerSearchDataRef[column.dataIndex as keyof typeof headerSearchDataRef]"
            :column="column"
            @search="tableHeaderSearch(confirm)"
            @reset="tableHeaderSearch(confirm)"
          />
          <CheckboxSearch
            v-if="column.headerSearchComponent === 'Checkbox'"
            v-model:value="headerSearchDataRef[column.dataIndex as keyof typeof headerSearchDataRef]"
            :column="column"
            @search="tableHeaderSearch(confirm)"
            @reset="tableHeaderSearch(confirm)"
          />
        </template>
        <template v-for="(_, slotName) of $slots" #[slotName]="slotData" :key="slotName">
          <slot :name="slotName" v-bind="slotData" />
        </template>
        <template #bodyCell="slotData">
          <slot name="bodyCell" v-bind="slotData" />
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { onActivated, onMounted, onUnmounted, toRefs, useSlots, watch } from 'vue';
import InputSearch from './components/headerSearchComponents/InputSearch.vue';
import CheckboxSearch from './components/headerSearchComponents/CheckboxSearch.vue';
import { Table } from 'ant-design-vue';
import {
  createTableContext,
  useColumns,
  useTableForm,
  useTableHeaderSearch,
  useTableMethods,
  useTableState,
  useVirtualized,
} from './hooks';
import { ToolBar } from './components';
import { llTableProps, tableEmits } from './types';
import type { TableActionType } from './Table.types';
import LForm from '~/components/Form';
import { styleFn } from './style';
import { deepEqual, isObject } from '@ssuperlilei/utils';
import { SearchOutlined } from '@ant-design/icons-vue';

defineOptions({
  name: 'LTable',
  inheritAttrs: false,
});

const props = defineProps(llTableProps);
const emit = defineEmits(tableEmits);
const slots = useSlots();

// 表格内部状态
const tableState = useTableState({ props, slots, emit });
const {
  tableKey,
  tableRef,
  queryFormRef,
  getBindValues,
  headerSearchInputRef,
  headerSearchDataRef,
  innerWidthMap,
  paginationRef,
} = tableState;
// 表格内部方法
const tableMethods = useTableMethods({ state: tableState, props, emit });
const {
  setProps,
  fetchData,
  handleSubmit,
  handleReset,
  reload,
  handleTableChange,
  handleResizeColumn,
  updateHeaderSearchData,
} = tableMethods;
const tableAction: TableActionType = {
  setProps,
  reload,
  fetchData,
  updateHeaderSearchData,
};
// 表格列的配置描述
const tableColumns = useColumns({
  props,
  slots,
  state: tableState,
  methods: tableMethods,
  tableAction,
});

const { innerColumns } = tableColumns;

// 搜索表单
const { getFormProps, replaceFormSlotKey, getFormSlotKeys } = useTableForm({
  tableState,
  tableMethods,
  slots,
});

// 表头搜索
const headerSearch = useTableHeaderSearch({
  tableState,
  tableMethods,
});
const { tableHeaderSearch } = headerSearch;

const { renderList, virtualizedClass, scrollTo } = useVirtualized({
  state: tableState,
});

onUnmounted(() => {
  // 清空 innerWidthMap map
  innerWidthMap.clear();
});

// 当前组件所有的状态和方法
const instance = {
  ...props,
  ...tableState,
  ...tableMethods,
  ...headerSearch,
  ...tableColumns,
  refProps: toRefs(props),
  scrollTo,
  emit,
};

styleFn();

createTableContext(instance);

// TODO: 血源--有缓存也刷新列表
// 挂载flag，防止多次请求
let mountedFlag = false;
onMounted(async () => {
  mountedFlag = true;
  await fetchData({ ...props.extraParams });
  mountedFlag = false;
});

onActivated(async () => {
  if (!mountedFlag) {
    fetchData({ ...props.extraParams });
  }
});
// 如果 extraParams 发生变化，重新请求数据
watch(
  () => props.extraParams,
  (val: any, oldVal: any) => {
    if (props.isExtraParamsChangeQuery && val && !deepEqual(val, oldVal)) {
      if (isObject(paginationRef.value)) {
        paginationRef.value.current = 1;
      }
      fetchData({
        ...val,
        pageNum: 1,
      });
    }
  },
  {
    deep: true,
  },
);
emit('register', instance);
defineExpose(instance);
</script>
