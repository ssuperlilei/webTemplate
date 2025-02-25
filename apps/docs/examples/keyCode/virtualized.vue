<template>
  <div ref="container" class="container" @scroll="handleScroll($event)">
    <div class="placeholder" :style="{ height: listHeight + 'px' }" />
    <div class="list-wrapper" :style="{ transform: getTransform }">
      <div
        v-for="item in renderList"
        :key="item.index"
        ref="itemRefs"
        class="card-item"
        :data-index="item.index"
      >
        <!-- 显示一个图片，不定高度 -->
        <img
          :src="`https://picsum.photos/200/200?random=${item.index}`"
          alt="img"
          :style="{
            // 随机高度
            height: item.height,
          }"
        />
        <span>{{ item.index }}</span>
        <span>{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>
<!-- item 不定高度 虚拟列表 -->
<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
const { listData, itemSize } = defineProps({
  // 列表数据
  listData: {
    type: Array,
    default: () => {
      return Array.from({ length: 1000 }).map((_, index) => ({
        index,
        value: `item-${index}`,
        height: `${Math.floor(Math.random() * 100) + 100}px`,
      }));
    },
  },
  // 预估item高度，不是真实item高度
  itemSize: {
    type: Number,
    default: 30,
  },
});

const container = ref<HTMLElement | null>(null);
const containerHeight = ref(0);
const start = ref(0);
const offset = ref(0);
const itemRefs = ref<HTMLElement[]>([]);
const positions = ref<
  {
    index: number;
    height: number;
    top: number;
    bottom: number;
  }[]
>([]);

const end = computed(() => start.value + renderCount.value);
const renderList = computed<Array<any>>(() => listData.slice(start.value, end.value + 1));
const renderCount = computed(() => Math.ceil(containerHeight.value / itemSize));
const listHeight = computed(() => positions.value[positions.value.length - 1].bottom);
const getTransform = computed(() => `translate3d(0,${offset.value}px,0)`);

watch(() => listData, initPosition, {
  immediate: true,
});

function handleScroll(e: Event) {
  const scrollTop = (e.target as HTMLElement).scrollTop;
  start.value = getStart(scrollTop);
  offset.value = positions.value[start.value].top;
}

function getStart(scrollTop: number) {
  let left = 0;
  let right = positions.value.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (positions.value[mid].bottom === scrollTop) {
      return mid + 1;
    } else if (positions.value[mid].bottom < scrollTop) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

function initPosition() {
  positions.value = [];
  listData.forEach((_item, index) => {
    positions.value.push({
      index,
      height: itemSize,
      top: index * itemSize,
      bottom: (index + 1) * itemSize,
    });
  });
}

function updatePosition() {
  itemRefs.value.forEach((el: HTMLElement) => {
    const index = parseInt(el.getAttribute('data-index') || '0', 10);
    const realHeight = el.getBoundingClientRect().height;
    const diffVal = positions.value[index].height - realHeight;
    const curItem = positions.value[index];
    if (diffVal !== 0) {
      // 说明item的高度不等于预估值
      curItem.height = realHeight;
      curItem.bottom = curItem.bottom - diffVal;
      for (let i = index + 1; i < positions.value.length - 1; i++) {
        positions.value[i].top = positions.value[i].top - diffVal;
        positions.value[i].bottom = positions.value[i].bottom - diffVal;
      }
    }
  });
}

onMounted(() => {
  if (container.value) {
    containerHeight.value = container.value.clientHeight;
  }
});

onUpdated(() => {
  updatePosition();
});
</script>

<style scoped>
.container {
  position: relative;
  height: 300px;
  overflow: auto;
}

.placeholder {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
}

.card-item {
  box-sizing: border-box;
  padding: 10px;
  color: #777;
  border-bottom: 1px solid #e1e1e1;
}
</style>
