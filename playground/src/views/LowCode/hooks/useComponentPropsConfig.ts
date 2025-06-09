export interface ComponentPropConfigItem {
  label: string;
  prop: string; // 支持嵌套，如 'componentProps.placeholder'
  type: 'input' | 'switch' | 'select' | 'number';
  options?: { label: string; value: any }[];
  extra?: string;
}

// 属性配置表
const componentPropsConfig: Record<string, ComponentPropConfigItem[]> = {
  Input: [
    { label: '标签', prop: 'label', type: 'input' },
    { label: '字段名', prop: 'field', type: 'input' },
    { label: '必填', prop: 'required', type: 'switch' },
    { label: '占位符', prop: 'componentProps.placeholder', type: 'input' },
    { label: '最大长度', prop: 'componentProps.maxLength', type: 'number' },
  ],
  InputTextArea: [
    { label: '标签', prop: 'label', type: 'input' },
    { label: '字段名', prop: 'field', type: 'input' },
    { label: '必填', prop: 'required', type: 'switch' },
    { label: '占位符', prop: 'componentProps.placeholder', type: 'input' },
    { label: '行数', prop: 'componentProps.rows', type: 'number' },
  ],
  InputNumber: [
    { label: '标签', prop: 'label', type: 'input' },
    { label: '字段名', prop: 'field', type: 'input' },
    { label: '必填', prop: 'required', type: 'switch' },
    { label: '最小值', prop: 'componentProps.min', type: 'number' },
    { label: '最大值', prop: 'componentProps.max', type: 'number' },
  ],
  Select: [
    { label: '标签', prop: 'label', type: 'input' },
    { label: '字段名', prop: 'field', type: 'input' },
    { label: '必填', prop: 'required', type: 'switch' },
    { label: '占位符', prop: 'componentProps.placeholder', type: 'input' },
    // 这里可以扩展 options 编辑
  ],
  Switch: [
    { label: '标签', prop: 'label', type: 'input' },
    { label: '字段名', prop: 'field', type: 'input' },
    { label: '必填', prop: 'required', type: 'switch' },
    { label: '开启文案', prop: 'componentProps.checkedChildren', type: 'input' },
    { label: '关闭文案', prop: 'componentProps.unCheckedChildren', type: 'input' },
  ],
  Radio: [
    { label: '标签', prop: 'label', type: 'input' },
    { label: '字段名', prop: 'field', type: 'input' },
    { label: '必填', prop: 'required', type: 'switch' },
    // 可扩展 options
  ],
  Checkbox: [
    { label: '标签', prop: 'label', type: 'input' },
    { label: '字段名', prop: 'field', type: 'input' },
    { label: '必填', prop: 'required', type: 'switch' },
    // 可扩展 options
  ],
  InputPassword: [
    { label: '标签', prop: 'label', type: 'input' },
    { label: '字段名', prop: 'field', type: 'input' },
    { label: '必填', prop: 'required', type: 'switch' },
    { label: '占位符', prop: 'componentProps.placeholder', type: 'input' },
  ],
  LTable: [
    { label: '字段名', prop: 'field', type: 'input' },
    { label: '表格列', prop: 'componentProps.columns', type: 'input' }, // 实际可扩展为复杂编辑器
  ],
  LSignature: [
    { label: '标签', prop: 'label', type: 'input' },
    { label: '字段名', prop: 'field', type: 'input' },
  ],
};

// 获取属性 schema
export function getComponentPropsConfig(typeOrComponent: string): ComponentPropConfigItem[] {
  return componentPropsConfig[typeOrComponent] || [];
}
