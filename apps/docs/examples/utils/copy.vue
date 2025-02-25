<template>
  <div>
    <Button @click="copyText">Copy</Button>
  </div>
</template>

<script setup lang="ts">
import { copyToClipboard } from '@ll_lib/utils';
import { Button, message } from 'ant-design-vue';

const copyText = async () => {
  await copyToClipboard('Hello, World!');

  message.success('Text copied to clipboard');
};
</script>
