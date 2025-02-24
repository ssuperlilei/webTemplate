<template>
  <Button v-show="hasPermission(1)" type="primary">Primary Button</Button>
  <Button>Default Button</Button>
  <Button v-show="hasPermission(2)" type="dashed">Dashed Button</Button>
  <Button v-show="hasPermission(3)" type="text">Text Button</Button>
  <Button v-show="hasPermission(4)" type="link">Link Button</Button>
</template>

<script setup lang="tsx">
import { Button } from 'ant-design-vue';
import { inject } from 'vue';
import { type LLPropsInjection, llPropsKey } from '@ll_lib/ui';

const llPropsInject: LLPropsInjection = inject(llPropsKey) as LLPropsInjection;
const hasPermission = llPropsInject?.hasPermission;
</script>
