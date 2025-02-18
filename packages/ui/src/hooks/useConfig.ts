import { Ref, inject, shallowRef } from 'vue';
import { configProviderInjectionKey } from '../components/ConfigProvider/hooks/context';
import { defaultClsPrefix } from '../components';

export function useClsPrefix(): Ref<string> {
  const NConfigProvider = inject(configProviderInjectionKey, null);
  return NConfigProvider ? NConfigProvider.clsPrefixRef : shallowRef(defaultClsPrefix);
}
