# 表单弹窗组件

表单弹窗组件，内置触发按钮以及表单验证，传入提交方法即可。

## 基础用法

::: raw
<demo class="vp-raw" vue="ui/modalForm/basic.vue" />
:::

## API

### ModalForm Props

| 属性               | 说明                          | 类型                                       | 默认值                                                                                                                              |
| ------------------ | ----------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| AntdV modal        | AntdV modal属性               | `ModalProps`                               | `{ wrapClassName: 'modalSizeMedium', destroyOnClose: true, maskClosable: false }`                                                   |
| formProps          | 同 Form 组件                  | `FormProps`                                | `{ showActionButtonGroup: false, labelWidth: 80,wrapperCol: { span: 24 }, baseColProps: { span: 24, }, rowProps: { gutter: 16, } }` |
| triggerButtonProps | trigger 按钮属性              | `ButtonProps`                              | `{ type: 'primary' }`                                                                                                               |
| triggerButtonText  | trigger 按钮文本              | `string`                                   | -                                                                                                                                   |
| submit             | 提交表单数据的方法            | `(formValues: Recordable) => Promise<any>` | -                                                                                                                                   |
| okButtonText       | okButtonText 按钮文本         | `string`                                   | -                                                                                                                                   |
| showOkButton       | 是否显示确定按钮              | `boolean`                                  | `true`                                                                                                                              |
| cancelButtonText   | cancelButtonText 按钮文本     | `string`                                   | -                                                                                                                                   |
| showCancelButton   | 是否显示取消按钮              | `boolean`                                  | `true`                                                                                                                              |
| preventDefault     | 是否阻止trigger按钮的默认行为 | `boolean`                                  | `true`                                                                                                                              |
| drag               | 按住 title 是否可以拖动       | `boolean`                                  | `true`                                                                                                                              |

### Events

| 事件名        | 说明         | 回调参数 |
| ------------- | ------------ | -------- |
| register      | 组件注册触发 | -        |
| 'update:open' | open值改变   |          |
| cancelModal   | 同 antdV     | -        |
| okModal       | 同 antdV     | -        |

## 函数式调用

函数式调用允许使用 hook 形式创建模态框，必须在 main.ts 中注册组件。

```ts
import { installUseModal } from '@ssuperlilei/ui';

installUseModal(app, {
  clsPrefix: 'ant',
  // 同 ModalForm Props
});
```

以下是一个示例：

::: raw
<demo class="vp-raw" vue="ui/modalForm/basic.vue" />
:::
