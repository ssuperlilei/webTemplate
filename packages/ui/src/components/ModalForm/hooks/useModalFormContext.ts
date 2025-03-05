import { inject, provide } from 'vue';
import type { ModalFormType } from '.';

const key = Symbol('l-modal-form');

export async function createModalFormContext(instance: ModalFormType) {
  provide(key, instance);
}

export function useModalFormContext(modalFormProps = {}) {
  return inject(key, modalFormProps) as ModalFormType;
}
