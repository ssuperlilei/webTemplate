<template>
  <div class="v-lazy-demo">
    <h1>v-lazy 图片懒加载指令演示</h1>

    <div class="description">
      <p>v-lazy 指令用于图片的懒加载，只有当图片进入视口或即将进入视口时才会加载图片。</p>
      <p>滚动页面查看效果，图片将在进入视口时才开始加载。</p>
    </div>

    <div v-for="(image, index) in images" :key="index" class="image-container">
      <div class="image-card">
        <div class="image-wrapper">
          <img
            v-lazy="image.url"
            :alt="'示例图片 ' + (index + 1)"
            class="lazy-image"
            data-loaded="false"
            @load="onImageLoad"
          />
          <div class="loading-placeholder">加载中...</div>
        </div>
        <div class="image-info">
          <h3>图片 {{ index + 1 }}</h3>
          <p>{{ image.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { vLazy } from '@ssuperlilei/directives';

// 图片数组，包含真实的图片URL
const images = ref([
  {
    url: 'https://picsum.photos/id/1/800/400',
    description: '这是一张使用 v-lazy 指令懒加载的图片。它只会在滚动到视图中时才会加载。',
  },
  {
    url: 'https://picsum.photos/id/10/800/400',
    description: '懒加载可以减少初始页面加载时间，提高用户体验。',
  },
  {
    url: 'https://picsum.photos/id/100/800/400',
    description: 'v-lazy 指令使用 IntersectionObserver API 来检测元素可见性。',
  },
  {
    url: 'https://picsum.photos/id/1000/800/400',
    description: '当图片元素至少有 10% 可见或在视口 100px 范围内时，图片将开始加载。',
  },
  {
    url: 'https://picsum.photos/id/1001/800/400',
    description: '图片加载后，IntersectionObserver 将停止对该元素的观察。',
  },
  {
    url: 'https://picsum.photos/id/1002/800/400',
    description: '这个指令非常适合长页面和图片密集型应用程序。',
  },
  {
    url: 'https://picsum.photos/id/1003/800/400',
    description: '通过减少不必要的图片加载，可以节省带宽并提高页面性能。',
  },
  {
    url: 'https://picsum.photos/id/1004/800/400',
    description: '如果你已经滚动到了这里，前面的所有图片已经被懒加载了。',
  },
]);

// 图片加载完成时的处理函数
const onImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.dataset.loaded = 'true';
};
</script>

<style scoped>
.v-lazy-demo {
  max-width: 800px;
  padding: 20px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
}

.description {
  padding: 15px;
  margin-bottom: 30px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.image-container {
  margin-bottom: 50px;
}

.image-card {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
}

.image-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 2/1;
  overflow: hidden;
  background-color: #f0f0f0;
}

.lazy-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-image[data-loaded='true'] {
  opacity: 1;
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: #666;
}

.image-info {
  padding: 15px;
}

h3 {
  margin-top: 0;
  margin-bottom: 10px;
}
</style>
