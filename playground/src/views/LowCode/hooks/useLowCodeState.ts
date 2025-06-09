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
  formSchemas: ReturnType<typeof ref<FormSchema[]>>;
  formProps: FormProps;
  basicComponents: ReturnType<typeof ref<BasicComponent[]>>;
  appendSchema: (schema: FormSchema) => void;
  selectComponent: (schema: FormSchema) => void;
  removeSchema: (index: number) => void;
  moveSchema: (from: number, to: number) => void;
}

export function useLowCodeState(): LowCodeState {
  // 表单实例引用
  const myFormRef = ref<FormInstance>();

  // 当前选中的组件
  const selectedComponent = ref<FormSchema | null>(null);

  // 所有表单项 schema
  const formSchemas = ref<FormSchema[]>([]);

  // 表单配置
  const formProps: FormProps = {
    get schemas() {
      return formSchemas.value;
    },
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
    formSchemas.value.push(schema);
    selectedComponent.value = schema;
  };

  // 选中某个 schema
  const selectComponent = (schema: FormSchema) => {
    selectedComponent.value = schema;
  };

  // 删除 schema
  const removeSchema = (index: number) => {
    if (formSchemas.value[index] === selectedComponent.value) {
      selectedComponent.value = null;
    }
    formSchemas.value.splice(index, 1);
  };

  // 移动 schema（排序）
  const moveSchema = (from: number, to: number) => {
    const arr = formSchemas.value;
    if (from < 0 || to < 0 || from >= arr.length || to >= arr.length) return;
    const item = arr.splice(from, 1)[0];
    arr.splice(to, 0, item);
  };

  return {
    myFormRef,
    selectedComponent,
    formSchemas,
    formProps,
    basicComponents,
    appendSchema,
    selectComponent,
    removeSchema,
    moveSchema,
  };
}
