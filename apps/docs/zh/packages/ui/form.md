# Form 组件

表单组件，组件内置很多方法以及参数，比如联动，接口请求以及时间的处理等等。

## 基础用法

<demo vue="ui/form/basic.vue" />

## API

### Form Props

| 属性                    | 说明                                  | 类型                                                       | 默认值                                                                     |
| ----------------------- | ------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| AntdV From              | AntdV From 组件的属性                 | `FormProps`                                                | `{ labelAlign: 'right', layout: 'horizontal', colon: false }`              |
| initialValues           | 预置字段默认值                        | `Object`                                                   | `{}`                                                                       |
| labelWidth              | 标签宽度 固定宽度                     | `[Number, String]`                                         | `100`                                                                      |
| FormSchema              | 表单配置规则                          | `FormSchema[]`                                             | `[]`                                                                       |
| mergeDynamicData        | 默认数据，合并进 formData             | `Object`                                                   | `null`                                                                     |
| baseRowStyle            | 默认 row style                        | `CSSProperties`                                            | `null`                                                                     |
| rowProps                | 栅栏Row配置                           | `RowProps`                                                 | `null`                                                                     |
| baseColProps            | 默认 col style                        | `Partial<ColEx>`                                           | `{ span: 6 }`                                                              |
| autoSubmitOnEnter       | 在INPUT组件上单击回车时，是否自动提交 | `Boolean`                                                  | `true`                                                                     |
| disabled                | 禁用表单                              | `Boolean`                                                  | `false`                                                                    |
| emptySpan               | 表单结束后空 span 占位符              | `Number`                                                   | `0`                                                                        |
| fieldMapToTime          | 处理时间段字段                        | `Object`                                                   | `null`                                                                     |
| transformDateFunc       | 转化时间字段                          | `Function`                                                 | `(date: any) => { return date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date; }` |
| rulesMessageJoinLabel   | 是否把 label 添加进校验信息           | `Boolean`                                                  | `true`                                                                     |
| autoAdvancedLine        | 超过 1 行自动折叠                     | `Number`                                                   | `1`                                                                        |
| alwaysShowLines         | 不受折叠影响的行数                    | `Number`                                                   | `1`                                                                        |
| showActionButtonGroup   | 是否显示操作按钮                      | `Boolean`                                                  | `true`                                                                     |
| actionColOptions        | 操作列Col配置                         | `Partial<ColEx>`                                           | `null`                                                                     |
| showResetButton         | 显示重置按钮                          | `Boolean`                                                  | `true`                                                                     |
| resetButtonOptions      | 重置按钮配置                          | `同确认按钮`                                               | `null`                                                                     |
| showSubmitButton        | 显示确认按钮                          | `Boolean`                                                  | `true`                                                                     |
| submitButtonOptions     | 确认按钮配置                          | `Partial<ButtonProps> & { text?: string; class?: string }` | `null`                                                                     |
| showAdvancedButton      | 是否显示收起展开按钮                  | `Boolean`                                                  | `false`                                                                    |
| resetFunc               | resetFunc                             | `Function`                                                 | `null`                                                                     |
| submitFunc              | 自定义提交函数                        | `Function`                                                 | `null`                                                                     |
| showAdvancedButtonBadge | 是否显示更多后的 徽标数               | `Boolean`                                                  | `false`                                                                    |
| advancedBadgeCount      | 徽标数数字                            | `Number`                                                   | `0`                                                                        |
| useMaxLengthRule        | 是否使用默认的长度校验                | `Boolean`                                                  | `true`                                                                     |
| formKey                 | formKey                               | `Number、String`                                           | `formKey`                                                                  |
| scrollToError           | 是否滑动到错误项                      | `Boolean`                                                  | `false`                                                                    |

### Events

| 事件名          | 说明             | 回调参数 |
| --------------- | ---------------- | -------- |
| register        | 组件注册触发     | -        |
| reset           | 重置触发         | 表单的值 |
| submit          | 提交触发         | 表单的值 |
| advancedChange  | 展开收起变化触发 | -        |
| formModelChange | 值发生改变触发   | 表单的值 |

### Methods

| 方法名               | 说明                                                                                       | 参数                                                                     | 返回值          |
| -------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | --------------- |
| setFormModel         | 设置某个字段的值                                                                           | key 字段, value 值                                                       | -               |
| setFormModels        | 设置formModel的值                                                                          | values 表单数据                                                          | -               |
| replaceFormModels    | 替换formModel的值                                                                          | values 表单数据                                                          | -               |
| getFormModelByField  | 获取某个字段的值                                                                           | key 字段                                                                 | value           |
| delFormModel         | 删除某个字段的值                                                                           | key 字段                                                                 | `boolean`       |
| setFormProps         | 设置表单配置                                                                               | `Partial<FormProps>`                                                     | -               |
| handleFormValues     | 处理表单数据                                                                               | values 表单数据                                                          | values 表单数据 |
| handleRangeTimeValue | 处理时间范围                                                                               | values 表单数据                                                          | values 表单数据 |
| getFormValues        | 获取表单数据                                                                               | -                                                                        | values 表单数据 |
| setFieldsValue       | 设置字段的值                                                                               | values 表单数据                                                          | -               |
| resetSchema          | 重置表单                                                                                   | values 表单数据                                                          | -               |
| removeAllSchema      | 删除所有的 Schema                                                                          | `{string、string[]} fields 排除的字段`                                   | -               |
| appendSchemaByField  | 插入到指定 filed 后面，如果没传指定 field，则插入到最后,当 first = true 时插入到第一个位置 | schemaItem, prefixField ,first                                           | -               |
| removeSchemaByFiled  | 根据 field 删除 Schema                                                                     | `{string、string[]} fields, isInclude 是否是field包含的字符串 默认false` | `boolean`       |
| getSchemaByFiled     | 根据 field 查找 Schema                                                                     | `{string、string[]} fields`                                              | -               |
| updateSchema         | 更新formItemSchema                                                                         | `{Partial<FormSchema> ,Partial<FormSchema>[]} data`                      | -               |
| resetForm            | 重置表单                                                                                   | -                                                                        | -               |
| scrollToField        | 滚动到指定表单项                                                                           | name 表单项的name , options 滚动配置                                     | -               |
| validateFields       | 校验表单                                                                                   | nameList 校验指定的表单项                                                | -               |
| validate             | 校验整个表单                                                                               | -                                                                        | values 表单数据 |
| clearValidate        | 清除校验                                                                                   | nameList 校验指定的表单项                                                | -               |
| handleSubmit         | 提交表单                                                                                   | -                                                                        | `Promise`       |
| handleEnterPress     | 监听键盘事件                                                                               | `e 事件 KeyboardEvent`                                                   | -               |
