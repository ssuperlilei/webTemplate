# useCounter

> 多语言封装，提供了一些常用的多语言方法, 用于 @ssuperlilei-lib/ui 组件库中。

## 基础用法

```typescript
import { t, changeLanguage, init } from '@ssuperlilei-lib/i18n';
init({
  lng: 'zh_CN',
  sources: {
    zh_CN: {
      translation: {
        key: '中文',
      },
    },
    en_US: {
      translation: {
        key: 'English',
      },
    },
  },
});
console.log(t('key')); // 输出对应的中文
changeLanguage('en_US');
console.log(t('key')); // 输出对应的英文
```
