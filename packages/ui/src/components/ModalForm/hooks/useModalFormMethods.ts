import { deepMerge } from '@ssuperlilei/utils';
import type { ModalFormEmitFn, ModalFormProps } from '../types';
import type { ModalFormState } from './useModalFormState';
import { unref } from 'vue';

export type ModalFormMethods = ReturnType<typeof useModalFormMethods>;

type UseModalFormActionContext = ModalFormState & {
  emit: ModalFormEmitFn;
};

export function useModalFormMethods(modalFormActionContext: UseModalFormActionContext) {
  const { formRef, confirmLoading, innerOpen, modalFormPropsRef } = modalFormActionContext;
  /**
   * @description 重置表单
   */
  const resetForm = () => {
    formRef.value?.resetForm();
  };
  /**
   * @description 获取表单数据
   */
  const getFormValues = () => {
    return formRef.value?.getFormValues();
  };
  /**
   * @description 校验表单
   * @returns Promise 返回表单数据
   */
  const validate = async () => {
    try {
      const formModel = await formRef.value?.validate();
      return formModel as Recordable<any>;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * @description 设置弹窗属性
   */
  const setProps = (props: Partial<ModalFormProps>) => {
    modalFormPropsRef.value = deepMerge(unref(modalFormPropsRef) || {}, props);
    if (props.open) {
      innerOpen.value = true;
    }
  };

  /**
   * @description 提交表单
   * @param fun 提交表单的方法
   * @returns Promise
   */
  const submit = async (fun: (formModel: Recordable<any>) => Promise<any>) => {
    try {
      confirmLoading.value = true;
      const formModel = await formRef.value?.submit();
      const result = await fun(formModel as Recordable<any>);
      modalFormActionContext.emit('update:open', false);
      confirmLoading.value = false;
      return result;
    } catch (error) {
      confirmLoading.value = false;
      return Promise.reject(error);
    } finally {
      confirmLoading.value = false;
    }
  };

  /**
   * @description 设置loading
   * @param loading 是否loading 默认true
   */
  const setLoading = (loading = true) => {
    confirmLoading.value = loading;
  };

  /**
   * @description 内部打开弹窗
   */
  const innerOpenModal = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    modalFormPropsRef.value.preventDefault && e.preventDefault();
    innerOpen.value = true;
  };

  return {
    validate,
    submit,
    resetForm,
    getFormValues,
    setLoading,
    innerOpenModal,
    setProps,
  };
}
