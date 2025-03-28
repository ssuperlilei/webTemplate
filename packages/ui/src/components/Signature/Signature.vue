<template>
  <div ref="containerRef" class="ll-signature-container">
    <canvas
      ref="canvasRef"
      class="ll-signature-canvas"
      @mousedown="onStartDrawing"
      @touchstart="onStartDrawing"
      @mouseup="onEndDrawing"
      @touchend="onEndDrawing"
      @mouseleave="onEndDrawing"
      @mousemove="onDrawing"
      @touchmove="onDrawing"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import styleFn from './style';
import type { SignatureEmits, SignatureProps } from './Signature.types';

defineOptions({
  name: 'LSignature',
});

const props = withDefaults(defineProps<SignatureProps>(), {
  quality: 1,
  lineWidth: 2,
  lineColor: '#000000',
  backgroundColor: '#ffffff',
  disabled: false,
  enableHistory: true,
});

const emit = defineEmits<SignatureEmits>();

const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const isDrawing = ref(false);
const isEmpty = ref(true);
const ctx = ref<CanvasRenderingContext2D | null>(null);

// 历史相关变量
const history = ref<string[]>([]);
const historyIndex = ref(-1);

onMounted(() => {
  initCanvas();
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 初始化时保存一个空白状态
  if (props.enableHistory) {
    saveHistory();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
});

watch(
  () => props.lineColor,
  () => {
    if (ctx.value) {
      ctx.value.strokeStyle = props.lineColor;
    }
  },
);

watch(
  () => props.lineWidth,
  () => {
    if (ctx.value) {
      ctx.value.lineWidth = props.lineWidth;
    }
  },
);

watch(
  () => props.backgroundColor,
  () => {
    if (ctx.value) {
      fillBackground();
      if (props.enableHistory) {
        saveHistory();
      }
    }
  },
);

const resizeCanvas = () => {
  if (!canvasRef.value || !containerRef.value) return;
  const { width, height } = containerRef.value.getBoundingClientRect();

  // 设置Canvas元素的实际尺寸
  canvasRef.value.width = width;
  canvasRef.value.height = height;

  // 重新设置上下文属性，因为尺寸变化会重置上下文
  if (ctx.value) {
    ctx.value.lineWidth = props.lineWidth;
    ctx.value.strokeStyle = props.lineColor;
    ctx.value.lineCap = 'round';
    ctx.value.lineJoin = 'round';
    fillBackground();
  }
};

const fillBackground = () => {
  if (!ctx.value || !canvasRef.value) return;

  ctx.value.fillStyle = props.backgroundColor;
  ctx.value.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);
};

const initCanvas = () => {
  if (!canvasRef.value) return;

  ctx.value = canvasRef.value.getContext('2d');
  if (!ctx.value) return;

  ctx.value.lineWidth = props.lineWidth;
  ctx.value.strokeStyle = props.lineColor;
  ctx.value.lineCap = 'round';
  ctx.value.lineJoin = 'round';
};

const onStartDrawing = (event: MouseEvent | TouchEvent) => {
  if (props.disabled) return;

  isDrawing.value = true;
  const { x, y } = getEventPosition(event);

  if (ctx.value) {
    ctx.value.beginPath();
    ctx.value.moveTo(x, y);
  }

  emit('start');
};

const onDrawing = (event: MouseEvent | TouchEvent) => {
  if (!isDrawing.value || props.disabled || !ctx.value) return;

  event.preventDefault();
  const { x, y } = getEventPosition(event);

  ctx.value.lineTo(x, y);
  ctx.value.stroke();

  isEmpty.value = false;
  emit('signing', isEmpty.value);
};

const onEndDrawing = () => {
  if (!isDrawing.value) return;

  isDrawing.value = false;
  emit('end');

  // 绘制完成后保存历史
  if (props.enableHistory) {
    saveHistory();
  }
};

// 保存当前画布状态到历史记录
const saveHistory = () => {
  if (!canvasRef.value || !props.enableHistory) return;

  // 如果当前不是最新状态（即用户撤销后又绘制），则移除当前状态之后的历史
  if (historyIndex.value < history.value.length - 1) {
    history.value = history.value.slice(0, historyIndex.value + 1);
  }

  // 保存当前状态
  const dataUrl = canvasRef.value.toDataURL('image/jpeg', props.quality);
  history.value.push(dataUrl);
  historyIndex.value = history.value.length - 1;

  // 通知历史状态变化
  emit('historyChange', canUndo(), canRedo());
};

// 判断是否可以撤销
const canUndo = (): boolean => {
  return props.enableHistory && historyIndex.value > 0;
};

// 判断是否可以重做
const canRedo = (): boolean => {
  return props.enableHistory && historyIndex.value < history.value.length - 1;
};

// 撤销功能
const undo = () => {
  if (!canUndo() || !ctx.value || !canvasRef.value) return;

  historyIndex.value--;
  restoreFromHistory();
};

// 重做功能
const redo = () => {
  if (!canRedo() || !ctx.value || !canvasRef.value) return;

  historyIndex.value++;
  restoreFromHistory();
};

// 从历史记录恢复画布状态
const restoreFromHistory = () => {
  if (!ctx.value || !canvasRef.value) return;

  const img = new Image();
  img.onload = () => {
    ctx.value!.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height);
    ctx.value!.drawImage(img, 0, 0);

    // 检查当前是否为空
    isEmpty.value = historyIndex.value === 0;
    emit('signing', isEmpty.value);

    // 通知历史状态变化
    emit('historyChange', canUndo(), canRedo());
  };
  img.src = history.value[historyIndex.value];
};

const getEventPosition = (event: MouseEvent | TouchEvent) => {
  if (!canvasRef.value) return { x: 0, y: 0 };

  const rect = canvasRef.value.getBoundingClientRect();
  let clientX, clientY;

  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
};

const clear = () => {
  if (!canvasRef.value || !ctx.value) return;

  // 使用Canvas的实际宽高来清除
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  fillBackground();

  isEmpty.value = true;
  emit('clear');
  emit('signing', isEmpty.value);

  // 清除操作也记录到历史
  if (props.enableHistory) {
    saveHistory();
  }
};

const getBase64 = (quality = 1): string => {
  if (!canvasRef.value) return '';
  return canvasRef.value.toDataURL('image/jpeg', quality);
};

const confirm = () => {
  if (!canvasRef.value) return;
  const dataUrl = getBase64(props.quality);
  emit('confirm', dataUrl);
};

// 暴露方法
defineExpose({
  clear,
  confirm,
  isEmpty: () => isEmpty.value,
  getBase64,
  undo,
  redo,
  canUndo,
  canRedo,
});

styleFn();
</script>
