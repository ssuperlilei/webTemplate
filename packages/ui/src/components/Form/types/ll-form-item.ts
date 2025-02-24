import { PropType } from 'vue';
import type { FormSchema } from './form';

export const lFormItemProps = {
  formModel: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  schema: {
    type: Object as PropType<FormSchema>,
    default: () => ({}),
  },
  useMaxLengthRule: {
    type: Boolean,
    default: true,
  },
};

export type LFormItemProps = typeof lFormItemProps;
