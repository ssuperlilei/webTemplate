# 使用 Monaco Editor 的注意事项

在使用 `monaco-editor` 时，尤其是在基于 Vite 的项目中，可能会遇到 `worker` 加载失败的问题。这是因为 `monaco-editor` 默认使用 Webpack 的方式加载 `worker`，而 Vite 的打包机制与 Webpack 不同，需要手动配置 `worker`。

## 解决方案

为了让 `monaco-editor` 正常工作，我们需要显式地引入各个语言的 `worker` 文件，并通过 `MonacoEnvironment` 的 `getWorker` 方法进行配置。以下是具体的处理方式：

### 引入 `worker`

我们通过以下方式引入 `worker` 文件：

```typescript
// @ts-ignore
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// @ts-ignore
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// @ts-ignore
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// @ts-ignore
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// @ts-ignore
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
```

通过 `?worker` 的方式引入文件是 Vite 的特性，它会将这些文件打包为独立的 `worker` 文件，并返回一个可以用于实例化的 `Worker` 类。

### 配置 `MonacoEnvironment`

我们需要通过 `self.MonacoEnvironment` 来覆盖默认的 `getWorker` 方法，根据语言标签返回对应的 `worker` 实例：

```typescript
// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};
```

### 为什么需要这一步？

`monaco-editor` 的默认行为是动态加载 `worker` 文件，但在 Vite 中，动态加载的路径可能会出错，导致 `worker` 无法找到。通过手动引入并配置 `getWorker` 方法，我们可以确保 `worker` 文件被正确加载。

## 总结

通过上述方式，我们可以在 Vite 项目中正常使用 `monaco-editor`，并支持多种语言的代码编辑功能。完整的代码示例可以参考以下内容：

```vue
<template>
  <div ref="editorContainer" class="editor-content" :class="[showBorder ? 'border-class' : '']" />
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
// @ts-ignore
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// @ts-ignore
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// @ts-ignore
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// @ts-ignore
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// @ts-ignore
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

const props = defineProps<{
  modelValue?: string;
  language?: string;
  theme?: string;
  readOnly?: boolean;
  showBorder?: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
}>();
// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      // eslint-disable-next-line new-cap
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      // eslint-disable-next-line new-cap
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      // eslint-disable-next-line new-cap
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      // eslint-disable-next-line new-cap
      return new tsWorker();
    }
    // eslint-disable-next-line new-cap
    return new editorWorker();
  },
};
const editorContainer = ref<HTMLElement | null>(null);
const editor = ref<monaco.editor.IStandaloneCodeEditor | null>(null);
const currentLanguage = computed(() => {
  return props.language || 'json';
});

// Initialize Monaco Editor
onMounted(() => {
  if (editorContainer.value) {
    editor.value = monaco.editor.create(editorContainer.value, {
      value: props.modelValue || '',
      language: currentLanguage.value,
      theme: props.theme || 'vs',
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      readOnly: props.readOnly || false,
      tabSize: 2,
      wordWrap: 'on',
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
      renderLineHighlight: 'all',
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
        useShadows: false,
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
    });

    // Handle editor content changes
    toRaw(editor.value).onDidChangeModelContent(() => {
      const value = toRaw(editor.value)?.getValue() || '';
      emit('update:modelValue', value);
      emit('change', value);
    });
  }
});

// Watch for language changes
watch(currentLanguage, (newLanguage) => {
  if (editor.value) {
    monaco.editor.setModelLanguage(toRaw(editor.value).getModel()!, newLanguage);
  }
});

// Watch for value changes from parent
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && newValue !== toRaw(editor.value)?.getValue()) {
      toRaw(editor.value)?.setValue(newValue || '');
    }
  },
);

// Watch for readOnly changes
watch(
  () => props.readOnly,
  (newReadOnly) => {
    if (editor.value) {
      editor.value.updateOptions({ readOnly: newReadOnly });
    }
  },
);

// Watch for theme changes
watch(
  () => props.theme,
  (newTheme) => {
    if (editor.value && newTheme) {
      monaco.editor.setTheme(newTheme);
    }
  },
);

// Cleanup
onBeforeUnmount(() => {
  if (editor.value) {
    toRaw(editor.value)?.dispose?.();
  }
});
</script>

<style scoped>
.editor-content {
  width: 100%;
  height: 100%;
}
.editor-content.border-class {
  border: 1px solid var(--bmos-first-level-border-color);
  border-radius: 4px;
}
</style>
```
