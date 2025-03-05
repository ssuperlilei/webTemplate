export type Drag = ReturnType<typeof useDrag>;

interface DragState {
  startX: number;
  startY: number;
  startLeft: number;
  startTop: number;
  dragging: boolean;
}

export function useDrag() {
  // 拖拽状态数据
  const dragState: DragState = {
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    dragging: false,
  };

  let targetElement: HTMLElement | null = null;

  // 鼠标移动事件处理
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.dragging || !targetElement) return;

    // 计算位移
    const offsetX = e.clientX - dragState.startX;
    const offsetY = e.clientY - dragState.startY;

    // 计算新位置（相对于父容器）
    const newLeft = dragState.startLeft + offsetX;
    const newTop = dragState.startTop + offsetY;

    // 更新位置
    targetElement.style.transform = `translate(${newLeft}px, ${newTop}px)`;
  };

  // 鼠标释放事件处理
  const handleMouseUp = () => {
    dragState.dragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // 鼠标按下事件处理函数
  const handleMouseDown = (e: MouseEvent) => {
    if (!targetElement) return;

    // 防止文本选择
    e.preventDefault();

    // 获取计算样式
    const computedStyle = getComputedStyle(targetElement);

    // 解析transform矩阵
    let transformMatrix = new DOMMatrix(computedStyle.transform);

    // 记录初始状态
    dragState.startX = e.clientX;
    dragState.startY = e.clientY;
    dragState.startLeft = transformMatrix.m41;
    dragState.startTop = transformMatrix.m42;
    dragState.dragging = true;

    // 添加事件监听
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const initDrag = (element: HTMLElement) => {
    targetElement = element;
  };

  const closeMouseListener = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return {
    initDrag,
    handleMouseDown,
    closeMouseListener,
  };
}
