import { tooltipProps } from 'ant-design-vue/es/tooltip';
import type { ExtractPropTypes, PropType } from 'vue';
import { initDefaultProps } from '~/_utils';

// props 对象
export const llEllipsisProps = {
  ...initDefaultProps(tooltipProps(), {
    placement: 'bottom',
    overlayClassName: 'll-tooltip-ellipsis',
  }),
  // 兄弟元素宽度， 相对于父级节点
  otherWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  // 是否显示
  tooltip: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  // 显示两行
  double: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
};

// props 类型
export type LLEllipsisProps = Partial<ExtractPropTypes<typeof llEllipsisProps>>;
