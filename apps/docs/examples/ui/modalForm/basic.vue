<template>
  <LConfigProvider>
    <LModalForm
      ref="modalFormRef"
      title="新增模板"
      drag
      :form-props="formProps"
      wrap-class-name="modalSizeMedium"
      :submit="submit"
    />

    <Button type="primary" @click="openHooksModal">函数式弹窗</Button>
  </LConfigProvider>
</template>

<script lang="tsx" setup>
import {
  type FormProps,
  LConfigProvider,
  LModalForm,
  type ModalFormInstance,
  useModal,
} from '@ssuperlilei/ui';
import { reactive, ref } from 'vue';

const modalFormRef = ref<ModalFormInstance>();

const formProps = reactive<FormProps>({
  schemas: [
    {
      field: 'name',
      component: 'Input',
      label: '模板名称',
      required: true,
    },
    {
      field: 'version',
      component: 'Input',
      label: '版本号',
      required: true,
    },
    {
      field: 'remark',
      component: 'InputTextArea',
      label: '备注',
    },
  ],
});

const submit = async (formModal: Record<string, any>) => {
  try {
    console.log(formModal);
    return Promise.resolve();
  } catch (_error: any) {
    console.log(_error);
    return Promise.reject();
  }
};

const [ModalRender] = useModal();

const openHooksModal = () => {
  ModalRender.show({
    title: '我是hook纯函数式模态框',
    content: 'hello',
    drag: true,
    formProps,
    wrapClassName: 'modalSizeMedium',
    submit,
  });
};
</script>

<style scoped lang="less"></style>
