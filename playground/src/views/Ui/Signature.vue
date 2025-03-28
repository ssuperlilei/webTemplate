<template>
  <LConfigProvider>
    <div style="height: 300px">
      <LSignature
        ref="signature"
        :line-width="5"
        :line-color="'#000000'"
        :background-color="'#ffffff'"
        :quality="1"
      />
    </div>
    <div style="display: flex; gap: 10px; margin-top: 10px">
      <a-button @click="confirm">获取图片</a-button>
      <a-button @click="clear">清除签名</a-button>
      <a-button @click="undo">撤销</a-button>
      <a-button @click="redo">回退</a-button>
    </div>
    <div v-if="src" style="margin-top: 10px">
      <img :src="src" alt="签名图片" style="max-width: 100%; border: 1px solid #ddd" />
    </div>
  </LConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LConfigProvider, LSignature, type LSignatureInstance } from '~@ssuperlilei/ui';

const src = ref<string>('');
const signature = ref<LSignatureInstance>();

const confirm = () => {
  src.value = signature.value?.getBase64?.(1) as string;
};

const clear = () => {
  if (signature.value) {
    signature.value?.clear?.();
    src.value = '';
  }
};

const undo = () => {
  if (signature.value) {
    signature.value?.undo?.();
  }
};
const redo = () => {
  if (signature.value) {
    signature.value?.redo?.();
  }
};
</script>
