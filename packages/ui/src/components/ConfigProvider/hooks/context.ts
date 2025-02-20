import { InjectionKey } from 'vue';
import { ConfigProviderInjection } from '../ConfigProvider.type';

export function createInjectionKey<T>(key: string): InjectionKey<T> {
  return key as any;
}
export const configProviderInjectionKey =
  createInjectionKey<ConfigProviderInjection>('ll-config-provider');

export const llPropsKey = createInjectionKey('ll-props');
