<template>
  <LConfigProvider>
    <div class="low-code-container">
      <div class="low-code-components">
        <div class="component-list">
          <div class="component-category">
            <div class="category-title">基础组件</div>
            <div
              v-for="item in basicComponents"
              :key="item.type"
              class="component-item"
              draggable="true"
              @dragstart="handleDragStart($event, item)"
            >
              <component :is="item.icon" />
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="low-code-canvas" @dragover.prevent @drop="handleDrop">
        <LForm ref="myFormRef" v-bind="formProps" :show-action-button-group="false" />
      </div>
      <div class="low-code-config">
        <div v-if="selectedComponent" class="config-panel">
          <div class="config-title">属性配置</div>
          <a-form :model="selectedComponent" layout="vertical">
            <a-form-item label="标签">
              <a-input v-model:value="selectedComponent.label" />
            </a-form-item>
            <a-form-item label="字段名">
              <a-input v-model:value="selectedComponent.field" />
            </a-form-item>
            <a-form-item label="必填">
              <a-switch v-model:checked="selectedComponent.required" />
            </a-form-item>
            <a-form-item label="占位符">
              <a-input v-model:value="selectedComponent.componentProps.placeholder" />
            </a-form-item>
          </a-form>
        </div>
        <div v-else class="empty-config">请选择组件进行配置</div>
      </div>
    </div>
  </LConfigProvider>
</template>

<script lang="tsx" setup>
import { ref, watch } from 'vue';
import {
  type FormInstance,
  type FormProps,
  LConfigProvider,
  LForm,
  LSignature,
  LTable,
} from '~@ssuperlilei/ui';
import {
  AudioOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  FormOutlined,
  NumberOutlined,
  SelectOutlined,
  SwapOutlined,
} from '@ant-design/icons-vue';

defineOptions({
  name: 'DemosLowCode',
});

const myFormRef = ref<FormInstance>();
const selectedComponent = ref<any>(null);

const formProps: FormProps = {
  schemas: [],
  labelWidth: 120,
  baseColProps: {
    span: 24,
  },
  showActionButtonGroup: false,
};

const basicComponents = [
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
];

const handleDragStart = (event: DragEvent, component: any) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('component', JSON.stringify(component));
  }
};

const getComponent = (component: any) => {
  if (component.component === 'LTable') {
    return <LTable />;
  } else if (component.component === 'LSignature') {
    return <LSignature />;
  } else {
    return component.type;
  }
};

const handleDrop = (event: DragEvent) => {
  const componentData = event.dataTransfer?.getData('component');
  if (componentData) {
    const component = JSON.parse(componentData);
    const newSchema = {
      field: `field_${Date.now()}`,
      label: component.label,
      component: getComponent(component),
      componentProps: {
        placeholder: `请输入${component.label}`,
      },
      noLabel: component.noLabel,
      required: false,
    };
    myFormRef.value?.appendSchemaByField(newSchema);
    selectedComponent.value = newSchema;
  }
};

// Watch for changes in selected component
watch(
  selectedComponent,
  (newVal) => {
    if (newVal) {
      // Update the schema in formProps when configuration changes
      const index = formProps.schemas.findIndex((schema) => schema.field === newVal.field);
      if (index !== -1) {
        formProps.schemas[index] = { ...newVal };
      }
    }
  },
  { deep: true },
);
</script>

<style lang="less" scoped>
.low-code-container {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #f0f2f5;
}

.low-code-components {
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
  padding: 16px;

  .component-list {
    .component-category {
      margin-bottom: 16px;

      .category-title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
        color: #1f1f1f;
      }

      .component-item {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        margin-bottom: 4px;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        cursor: move;
        transition: all 0.3s;

        &:hover {
          background-color: #f5f5f5;
          border-color: #d9d9d9;
        }

        .anticon {
          margin-right: 8px;
          font-size: 16px;
        }
      }
    }
  }
}

.low-code-canvas {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background-color: #fff;
  margin: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.low-code-config {
  width: 300px;
  background-color: #fff;
  border-left: 1px solid #e8e8e8;
  padding: 16px;
  overflow-y: auto;

  .config-panel {
    .config-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e8e8e8;
    }
  }

  .empty-config {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
    font-size: 14px;
  }
}

.form-item-wrapper {
  position: relative;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    border-color: #1890ff;
    background-color: rgba(24, 144, 255, 0.02);
  }

  &.selected {
    border-color: #1890ff;
    background-color: rgba(24, 144, 255, 0.05);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
}
</style>
