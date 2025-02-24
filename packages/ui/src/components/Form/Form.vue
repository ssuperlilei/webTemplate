<template>
  <Form
    ref="lFormRef"
    v-bind="objectPick(getFormProps, aFormPropKeys)"
    class="ll-form"
    :model="formModel"
    @keypress.enter="handleEnterPress"
  >
    <Row v-bind="getRowConfig">
      <slot name="formHeader" />
      <slot>
        <template v-for="schemaItem in formSchemasRef" :key="schemaItem.field">
          <LFormItem
            v-model:form-model="formModel"
            :schema="schemaItem"
            :use-max-length-rule="
              isNullOrUnDef(schemaItem.useMaxLengthRule)
                ? getFormProps.useMaxLengthRule
                : schemaItem.useMaxLengthRule
            "
            :style="{ zIndex: 99 }"
          >
            <template v-for="item in Object.keys(slots)" #[item]="data" :key="item">
              <slot :name="item" v-bind="data || {}" />
            </template>
          </LFormItem>
        </template>
        <FormAction
          v-if="getFormProps.showActionButtonGroup"
          v-bind="getFormActionBindProps"
          @toggle-advanced="handleToggleAdvanced"
          @update:action-col-options="updateActionColOptions"
        >
          <template
            v-for="item in ['advanceBefore', 'resetBefore', 'submitBefore', 'submitAfter']"
            #[item]="data"
          >
            <slot :name="item" v-bind="data || {}" />
          </template>
        </FormAction>
      </slot>
      <slot name="formFooter" />
    </Row>
  </Form>
</template>

<script lang="ts" setup>
import { cloneDeep, isNullOrUnDef, objectPick } from '@ll_lib/utils';
import { Form, Row } from 'ant-design-vue';
import { ref, useAttrs, useSlots, watch } from 'vue';
import FormAction from './components/FormAction.vue';
import {
  type LFormType,
  createFormContext,
  useAdvanced,
  useFormEvents,
  useFormMethods,
  useFormState,
} from './hooks/';
import LFormItem from './FormItem.vue';
import { aFormPropKeys, lFormEmits, lFormProps } from './types/ll-form';
import { styleFn } from './style';

defineOptions({
  name: 'LForm',
});

const props = defineProps(lFormProps);

const emit = defineEmits(lFormEmits);
const attrs = useAttrs() as Record<string, unknown>;
const slots = useSlots() as Record<string, unknown>;
// 表单内部状态
const formState = useFormState({ props, attrs });
const { formModel, getRowConfig, lFormRef, getFormProps, getFormActionBindProps, formSchemasRef } =
  formState;

// 表单内部方法
const formMethods = useFormMethods({ ...formState });
const { initFormValues, handleFormValues } = formMethods;

// a-form表单事件二次封装和扩展
const formEvents = useFormEvents({ ...formState, emit, handleFormValues });
const { handleEnterPress } = formEvents;

// 当前组件所有的状态和方法
const instance = {
  ...formState,
  ...formEvents,
  ...formMethods,
} as LFormType;

const actionColOptionsSpan = ref<number>(0);
const updateActionColOptions = (span: number) => {
  actionColOptionsSpan.value = span;
};

// 搜索表单 展开/收起 表单项hooks
const { handleToggleAdvanced } = useAdvanced({
  instance,
  emit,
  actionColOptionsSpan,
});

// initialValues 变化时，更新表单数据
watch(
  () => props.initialValues,
  (val) => {
    if (val) {
      initFormValues(cloneDeep(val));
    } else {
      initFormValues();
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

// 绑定css
styleFn();

emit('register', instance);

createFormContext(instance);

defineExpose(instance);
</script>
