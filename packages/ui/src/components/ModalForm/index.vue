<template>
  <Modal
    ref="modalFormRef"
    v-bind="objectPick(getModalFormProps, aModalFormPropKeys)"
    :confirm-loading="confirmLoading"
    :open="openRef"
    @ok="ok"
    @cancel="cancel"
  >
    <!-- 表单之前的插槽 -->
    <div v-if="slots.formBefore" style="padding-bottom: 20px">
      <slot name="formBefore" v-bind="instance" />
    </div>
    <LForm
      v-if="!isUnDef(getModalFormProps.formProps)"
      ref="formRef"
      v-bind="getModalFormProps.formProps"
    >
      <template
        v-for="item in Object.keys(
          omit(slots, ['default', 'cancelText', 'closeIcon', 'footer', 'okText', 'title']),
        )"
        #[item]="data"
        :key="item"
      >
        <slot :name="item" v-bind="data || {}" />
      </template>
    </LForm>
    <template #title>
      <div v-if="getModalFormProps.drag" class="l-modal-title" @mousedown="handleMouseDown">
        {{ getModalFormProps.title }}
      </div>
      <div v-else class="l-modal-title-no-drag">{{ getModalFormProps.title }}</div>
    </template>
    <template #footer>
      <template v-if="slots.footer">
        <slot name="footer" v-bind="instance" />
      </template>
      <template v-else>
        <Button
          v-if="getModalFormProps.showCancelButton"
          v-bind="getModalFormProps.cancelButtonProps"
          @click="cancel"
        >
          {{ getModalFormProps.cancelButtonText ?? t('取消') }}
        </Button>
        <Button
          v-if="getModalFormProps.showOkButton"
          type="primary"
          :loading="confirmLoading"
          v-bind="getModalFormProps.okButtonProps"
          @click="ok"
        >
          {{ getModalFormProps.okButtonText ?? t('确定') }}
        </Button>
      </template>
    </template>
    <template v-for="item in Object.keys(omit(slots, ['footer']))" #[item]="data" :key="item">
      <slot :name="item" v-bind="data || {}" />
    </template>
  </Modal>
  <template v-if="openUndefined">
    <span class="ll-modal-form-trigger" @click="innerOpenModal">
      <slot name="trigger" v-bind="instance">
        <Button v-bind="getTriggerButtonProps">
          {{ getModalFormProps.triggerButtonText ?? t('新建') }}
        </Button>
      </slot>
    </span>
  </template>
</template>
<script lang="ts" setup>
import { Button, Modal } from 'ant-design-vue';
import { aModalFormPropKeys, modalFormEmits, modalFormProps } from './types';
import { styleFn } from './style';
import { isUnDef, objectPick, omit } from '@ssuperlilei/utils';
import { inject, nextTick, onBeforeUnmount, useAttrs, useSlots, watch } from 'vue';
import {
  type ModalFormType,
  createModalFormContext,
  useModalFormEvents,
  useModalFormMethods,
  useModalFormState,
} from './hooks/';
import LForm from '~/components/Form';
import { t } from '@ssuperlilei/i18n';
import { type ConfigProviderInjection, configProviderInjectionKey } from '~/components';
import { useDrag } from '@ssuperlilei/hooks';

defineOptions({
  name: 'LModalForm',
});
const props = defineProps(modalFormProps);
const emit = defineEmits(modalFormEmits);
const slots = useSlots();
const attrs = useAttrs();

// modalForm内部状态
const modalFormState = useModalFormState({ props, attrs, emit });
const {
  openRef,
  modalFormRef,
  formRef,
  getModalFormProps,
  confirmLoading,
  openUndefined,
  getTriggerButtonProps,
} = modalFormState;

// modalForm 事件处理
const modalFormMethods = useModalFormMethods({ ...modalFormState, emit });
styleFn();

const { innerOpenModal } = modalFormMethods;

const modalFormEvents = useModalFormEvents({
  ...modalFormState,
  ...modalFormMethods,
  emit,
  props,
});

const { handleMouseDown, closeMouseListener, initDrag } = useDrag();
// 获取configProvider的 前缀
const provideConfig: ConfigProviderInjection = inject(
  configProviderInjectionKey,
) as ConfigProviderInjection;

watch(
  () => openRef.value,
  async (v) => {
    if (v) {
      await nextTick();
      initDrag(
        document.querySelector(
          `.${provideConfig?.clsPrefixRef?.value ?? props.clsPrefix}-modal`,
        ) as HTMLElement,
      );
    }
  },
  { immediate: false },
);
const { ok, cancel } = modalFormEvents;

// 当前组件所有的状态和方法
const instance = {
  ...modalFormState,
  ...modalFormEvents,
  ...modalFormMethods,
} as ModalFormType;

emit('register', instance);

createModalFormContext(instance);

defineExpose(instance);

// 组件卸载前清理事件
onBeforeUnmount(() => {
  closeMouseListener();
});
</script>
