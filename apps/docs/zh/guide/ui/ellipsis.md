# Ellipsis 文本省略

Ellipsis 是一个用于处理文本溢出显示省略号的组件，当文本内容超出容器宽度时自动显示省略号，并可选择性地通过 Tooltip 展示完整内容。

## 功能特点

- 自动检测文本是否溢出
- 支持单行和多行文本省略
- 可配置是否显示 Tooltip
- 支持考虑兄弟元素宽度的影响

## 基本用法

::: raw
<demo class="vp-raw" vue="ui/ellipsis/basic.vue" />
:::

## API

### 属性

| 参数       | 说明                         | 类型             | 默认值 |
| ---------- | ---------------------------- | ---------------- | ------ |
| tooltip    | 是否显示 Tooltip             | boolean          | true   |
| double     | 是否启用双行省略             | boolean          | false  |
| otherWidth | 兄弟元素宽度，相对于父级节点 | number \| string | 0      |

此外，组件还支持 Ant Design Vue 的 [Tooltip](https://www.antdv.com/components/tooltip-cn) 组件的所有属性，例如 `placement`、`overlayClassName` 等。

### 插槽

| 名称    | 说明                             |
| ------- | -------------------------------- |
| default | 默认插槽，用于放置需要省略的内容 |

## 注意事项

1. 组件默认会自动检测文本是否溢出，只有在溢出时才会应用省略效果和显示 Tooltip
2. 使用 `double` 属性时，请确保父容器有足够的高度显示两行文本
3. 当与其他元素并列使用时，建议设置 `otherWidth` 属性以获得更准确的省略效果
