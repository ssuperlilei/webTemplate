import type { ModalFormProps } from '~/components';
import type { JSX } from 'vue/jsx-runtime';

// 模态框
export interface HookModalProps extends Partial<ModalFormProps> {
  /** 当前模态框是否处于App.vue上下文中 */
  isAppChild?: boolean;
  content?: string | JSX.Element | (() => JSX.Element);
}
