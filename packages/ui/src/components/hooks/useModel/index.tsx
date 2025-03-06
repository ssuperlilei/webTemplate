import { createVNode, ref, render, getCurrentInstance, nextTick } from 'vue';
import { LModalForm, type ModalFormInstance } from '~/components';
import type { App, ComponentInternalInstance, FunctionalComponent } from 'vue';
import type { HookModalProps } from './type';

let _app: App;
let _props: HookModalProps;

interface ModalRenderComp<T> extends FunctionalComponent<T> {
  show: (props: HookModalProps) => Promise<void>;
  hide: () => void;
  setProps: (props: HookModalProps) => Promise<void>;
}

export const useModal = () => {
  let _modalInstance: ComponentInternalInstance;
  const modalRef = ref<ModalFormInstance>();
  const appContext = _app?._context || getCurrentInstance()?.appContext;
  // 当前模态框是否处于App.vue上下文中
  const isAppChild = ref(false);

  const getModalInstance = async () => {
    await nextTick();
    if (isAppChild.value && modalRef.value) {
      return modalRef.value;
    }

    if (_modalInstance) {
      return _modalInstance;
    }

    // 创建容器并添加到 body 中（这是关键修复）
    const container = document.createElement('div');
    document.body.appendChild(container);

    const vNode = createVNode(LModalForm);
    vNode.appContext = appContext;
    render(vNode, container);
    _modalInstance = vNode.component!;

    // 确保实例存在
    if (!_modalInstance) {
      console.error('Failed to create modal instance');
      throw new Error('Failed to create modal instance');
    }

    return _modalInstance;
  };

  const setProps = async (_props: HookModalProps) => {
    try {
      const instance = await getModalInstance();
      if (Object.is(instance, modalRef.value)) {
        // @ts-ignore
        instance?.setProps?.(_props);
      } else {
        // @ts-ignore
        instance?.exposed?.setProps?.(_props);
      }
    } catch (error) {
      console.error('Failed to set modal props:', error);
    }
  };

  const hide = () => {
    setProps({ open: false });
  };

  const show = async (props: HookModalProps) => {
    try {
      await setProps({
        ..._props,
        ...props,
        open: true,
      });
      // 确保渲染完成
      await nextTick();
      await nextTick(); // 双重nextTick确保DOM完全更新
    } catch (error) {
      console.error('Failed to show modal:', error);
    }
  };

  const ModalRender: ModalRenderComp<HookModalProps> = (props, { attrs, slots }) => {
    isAppChild.value = true;
    return <LModalForm ref={modalRef} {...{ ...attrs, ...props, open: true }} v-slots={slots} />;
  };

  ModalRender.show = show;
  ModalRender.hide = hide;
  ModalRender.setProps = setProps;

  return [ModalRender, modalRef] as const;
};

export type ModalInstance = ReturnType<typeof useModal>;

export const installUseModal = (app: App, options: HookModalProps) => {
  _app = app;
  _props = options;
};
