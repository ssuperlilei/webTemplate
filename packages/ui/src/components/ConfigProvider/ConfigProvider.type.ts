import { configProviderProps } from 'ant-design-vue/es/config-provider/context';
import type { ExtractPropTypes, Ref } from 'vue';
import { initDefaultProps } from '~/_utils';

export interface ConfigProviderInjection {
  clsPrefixRef: Ref<string>;
}
export interface LLPropsInjection {
  hasPermission: (code: string) => boolean;
}
// props 对象
export const llConfigProviderProps = {
  ...initDefaultProps(configProviderProps(), {}),
  lang: {
    type: String,
    default: 'zh_CN',
  },
};

export type LLConfigProviderProps = Partial<ExtractPropTypes<typeof llConfigProviderProps>>;
