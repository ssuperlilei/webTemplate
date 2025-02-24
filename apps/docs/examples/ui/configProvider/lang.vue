<template>
  <LConfigProvider :lang="lang">
    <RadioGroup v-model:value="lang">
      <RadioButton key="en_US" value="en_US">English</RadioButton>
      <RadioButton key="zh_CN" value="zh_CN">中文</RadioButton>
    </RadioGroup>
    <Pagination :total="50" show-size-changer />
  </LConfigProvider>
</template>

<script setup lang="ts">
import { Pagination, RadioButton, RadioGroup } from 'ant-design-vue';
import { ref } from 'vue';

const lang = ref('zh_CN');
</script>
