import type { DirectiveBinding } from 'vue';

const lazy = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding<string>) {
    // 确保 el 是 <img> 标签
    if (el.tagName !== 'IMG') {
      console.warn('v-lazy 只能用于 <img> 元素');
      return;
    }

    const loadImage = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.src = binding.value; // 设置真实图片地址
          observer.unobserve(el); // 加载后停止观察
        }
      });
    };

    const observer = new IntersectionObserver(loadImage, {
      rootMargin: '100px', // 提前 100px 触发加载
      threshold: 0.1, // 当图片 10% 可见时加载
    });

    observer.observe(el);
  },
};

export default lazy;
