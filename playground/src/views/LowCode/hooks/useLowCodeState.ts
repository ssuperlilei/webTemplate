import { ref } from 'vue';
import type { FormInstance, FormProps, FormSchema } from '~@ssuperlilei/ui';
import {
  AudioOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  FormOutlined,
  NumberOutlined,
  SelectOutlined,
  SwapOutlined,
} from '@ant-design/icons-vue';

export interface BasicComponent {
  type?: string;
  component?: string;
  label: string;
  icon: any;
  noLabel?: boolean;
  componentProps?: Record<string, any>;
}

interface LowCodeState {
  myFormRef: ReturnType<typeof ref<FormInstance | undefined>>;
  selectedComponent: ReturnType<typeof ref<FormSchema | null>>;
  formProps: FormProps;
  basicComponents: ReturnType<typeof ref<BasicComponent[]>>;
  appendSchema: (schema: FormSchema) => void;
}

export function useLowCodeState(): LowCodeState {
  // 表单实例引用
  const myFormRef = ref<FormInstance>();

  // 当前选中的组件
  const selectedComponent = ref<FormSchema | null>(null);

  // 表单配置
  const formProps: FormProps = {
    schemas: [],
    labelWidth: 120,
    baseColProps: {
      span: 24,
    },
    showActionButtonGroup: false,
  };

  // 基础组件列表
  const basicComponents = ref<BasicComponent[]>([
    { type: 'Input', label: '输入框', icon: FormOutlined },
    { type: 'InputTextArea', label: '文本域', icon: FormOutlined },
    { type: 'InputNumber', label: '数字输入框', icon: NumberOutlined },
    { type: 'Select', label: '下拉选择', icon: SelectOutlined },
    { type: 'DatePicker', label: '日期选择', icon: CalendarOutlined },
    { type: 'Switch', label: '开关', icon: SwapOutlined },
    { type: 'Radio', label: '单选框', icon: AudioOutlined },
    { type: 'Checkbox', label: '多选框', icon: CheckSquareOutlined },
    { type: 'InputPassword', label: '密码', icon: CheckSquareOutlined },
    { component: 'LTable', label: '表格', icon: CheckSquareOutlined, noLabel: true },
    { component: 'LSignature', label: '签名', icon: CheckSquareOutlined },
  ]);

  // 添加新的schema
  const appendSchema = (schema: FormSchema) => {
    myFormRef.value?.appendSchemaByField(schema);
    selectedComponent.value = schema;
  };

  return {
    myFormRef,
    selectedComponent,
    formProps,
    basicComponents,
    appendSchema,
  };
}
