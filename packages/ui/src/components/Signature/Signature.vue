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
});

const emit = defineEmits<SignatureEmits>();

const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const isDrawing = ref(false);
const isEmpty = ref(true);
const ctx = ref<CanvasRenderingContext2D | null>(null);

onMounted(() => {
  initCanvas();
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
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
};

const getBase64 = (quality = 1) => {
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
});

styleFn();
</script>
