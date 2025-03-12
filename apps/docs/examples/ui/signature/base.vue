<template>
  <LConfigProvider>
    <LSignature :line-width="5" :line-color="'#000000'" :background-color="'#ffffff'" />
  </LConfigProvider>
</template>

<script setup lang="ts">
import { LConfigProvider, LSignature } from '@ssuperlilei/ui';
</script>
