import { inputProps } from 'ant-design-vue/es/vc-input/inputProps';
import type { ExtractPropTypes } from 'vue';
import { initDefaultProps } from '~/_utils';

// props 对象
export const llPasswordInputProps = {
  ...initDefaultProps(inputProps(), {
    type: 'text',
    autocomplete: 'off',
    allowClear: true,
  }),
};

// props 类型
export type LLPasswordInputProps = Partial<ExtractPropTypes<typeof llPasswordInputProps>>;
