# useDrag

`useDrag` 是一个用于实现元素拖拽功能的 Vue 3 组合式 API 钩子函数。

## 功能特点

- 使用 CSS transform 实现平滑拖拽
- 支持任意 HTML 元素
- 简单易用的 API
- 自动处理事件监听器的添加和移除

## 基本用法

<demo vue="hooks/useDrag/basic.vue" />

## API 参考

### 返回值

| 名称               | 类型                             | 描述                                                        |
| ------------------ | -------------------------------- | ----------------------------------------------------------- |
| initDrag           | `(element: HTMLElement) => void` | 初始化拖拽功能的函数，接收一个 HTML 元素作为拖拽目标        |
| handleMouseDown    | `(e: MouseEvent) => void`        | 处理鼠标按下事件的函数，通常绑定到目标元素的 mousedown 事件 |
| closeMouseListener | `() => void`                     | 移除所有事件监听器的函数，在组件卸载时调用                  |

## 高级用法

### 限制拖拽范围

您可以在应用程序中根据需要扩展 `useDrag` 钩子，以添加边界限制：

```typescript
const { initDrag, handleMouseDown, closeMouseListener } = useDrag();

// 在您的应用程序逻辑中添加边界检查
const handleCustomMouseDown = (e: MouseEvent) => {
  // 自定义边界检查逻辑
  const container = document.querySelector('.container');
  if (container && dragEl.value) {
    // 获取容器和元素尺寸
    // 实现边界检查
  }

  handleMouseDown(e);
};
```

## 注意事项

1. 记得在组件卸载时调用 `closeMouseListener()` 以避免内存泄漏
2. 确保在 `initDrag()` 中传入正确的 DOM 元素
3. 默认情况下，元素使用 CSS transform 属性进行定位
