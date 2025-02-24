<template>
  <LConfigProvider>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </LConfigProvider>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue';
</script>
