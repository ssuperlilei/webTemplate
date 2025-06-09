<template>
  <LConfigProvider>
    <div class="low-code-container">
      <div class="low-code-components">
        <div class="component-list">
          <div class="component-category">
            <div class="category-title">基础组件</div>
            <div
              v-for="item in basicComponents"
              :key="item.type || item.component"
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
        <div
          v-if="formSchemas.length === 0"
          style="padding: 40px 0; color: #bbb; text-align: center"
        >
          请从左侧拖拽组件到此处
        </div>
        <div v-else>
          <div
            v-for="(schema, idx) in formSchemas"
            :key="schema.field"
            class="form-item-wrapper"
            :class="{ selected: selectedComponent === schema }"
            style="position: relative; margin-bottom: 12px"
            @click="handleSelect(schema)"
          >
            <LForm
              :schemas="[schema]"
              :label-width="formProps.labelWidth"
              :show-action-button-group="false"
            />
            <div style="position: absolute; top: 8px; right: 8px; display: flex; gap: 4px">
              <button :disabled="idx === 0" @click.stop="handleMoveUp(idx)">↑</button>
              <button :disabled="idx === formSchemas.length - 1" @click.stop="handleMoveDown(idx)">
                ↓
              </button>
              <button @click.stop="handleRemove(idx)">删除</button>
            </div>
          </div>
        </div>
      </div>
      <div class="low-code-config">
        <div v-if="selectedComponent" class="config-panel">
          <div class="config-title">属性配置</div>
          <LForm
            v-model="selectedComponent"
            :schemas="propFormSchemas"
            layout="vertical"
            :label-width="100"
            :show-action-button-group="false"
          />
        </div>
        <div v-else class="empty-config">请选择组件进行配置</div>
      </div>
    </div>
  </LConfigProvider>
</template>

<script lang="tsx" setup>
import { type BasicComponent, useLowCodeState } from './hooks/useLowCodeState';
import { type FormSchema, LConfigProvider, LForm } from '~@ssuperlilei/ui';
import { getComponentPropsConfig } from './hooks/useComponentPropsConfig';
import { computed } from 'vue';

defineOptions({
  name: 'DemosLowCode',
});

const {
  selectedComponent,
  formSchemas,
  formProps,
  basicComponents,
  appendSchema,
  selectComponent,
  removeSchema,
  moveSchema,
} = useLowCodeState();

const handleDragStart = (event: DragEvent, component: any) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('component', JSON.stringify(component));
  }
};

const getComponent = (component: any) => {
  if (component.component === 'LTable') {
    return 'LTable';
  } else if (component.component === 'LSignature') {
    return 'LSignature';
  } else {
    return component.type;
  }
};

const handleDrop = (event: DragEvent) => {
  const componentData = event.dataTransfer?.getData('component');
  if (componentData) {
    const component: BasicComponent = JSON.parse(componentData);
    const newSchema: FormSchema = {
      field: `field_${Date.now()}`,
      label: component.label,
      component: getComponent(component),
      componentProps: {
        placeholder: `请输入${component.label}`,
        ...component.componentProps,
      },
      noLabel: component.noLabel,
      required: false,
    };
    appendSchema(newSchema);
  }
};

const handleSelect = (schema: FormSchema) => {
  selectComponent(schema);
};

const handleRemove = (index: number) => {
  removeSchema(index);
};

const handleMoveUp = (index: number) => {
  if (index > 0) moveSchema(index, index - 1);
};
const handleMoveDown = (index: number) => {
  if (index < formSchemas.value.length - 1) moveSchema(index, index + 1);
};

// 动态属性 schema
const currentComponentType = computed(() => {
  if (!selectedComponent.value) return '';
  return selectedComponent.value.component || selectedComponent.value.type || '';
});
const propConfigList = computed(() => getComponentPropsConfig(currentComponentType.value));

// propConfigList 映射为 LForm schema
const propFormSchemas = computed<FormSchema[]>(() => {
  return propConfigList.value.map((item) => {
    let component = 'Input';
    if (item.type === 'input') component = 'Input';
    else if (item.type === 'number') component = 'InputNumber';
    else if (item.type === 'switch') component = 'Switch';
    else if (item.type === 'select') component = 'Select';
    return {
      field: item.prop,
      label: item.label,
      component,
      componentProps: item.options ? { options: item.options } : {},
    };
  });
});
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
