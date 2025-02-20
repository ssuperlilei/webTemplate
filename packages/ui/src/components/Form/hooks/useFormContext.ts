import { inject, provide } from 'vue';
import type { LFormType } from './';

const key = Symbol('bm-form');

export async function createFormContext(instance: LFormType) {
  provide(key, instance);
}

export function useFormContext(formProps = {}) {
  return inject(key, formProps) as LFormType;
}
