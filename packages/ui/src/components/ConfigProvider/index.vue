<template>
  <ConfigProvider v-bind="getBindValue">
    <template #renderEmpty>
      <div style="text-align: center">
        <InfoCircleOutlined />
        <p>{{ '暂无数据' }}</p>
      </div>
    </template>
    <slot></slot>
  </ConfigProvider>
</template>

<script lang="tsx" setup>
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import { deepMerge, removeEmpty } from '@ll_lib/utils';
import { ConfigProvider } from 'ant-design-vue';
import { computed, provide, ref, unref, useAttrs } from 'vue';
import { configProviderInjectionKey } from './hooks/context';
import { llConfigProviderProps } from './ConfigProvider.type';
import { mountStyle } from '../../_utils';
import commonStyle from './style/common';
import basicStyle from './style/basic';
import expandComponents from './style/expandComponents';
import exception from './style/exception';
import commonConfig from './common/config';
import antDesignI18n, { AntDesignLocaleType } from './common/antDesignI18n';
import { InfoCircleOutlined } from '@ant-design/icons-vue';

defineOptions({
  name: 'LLConfigProvider',
});

const props = defineProps(llConfigProviderProps);
const dayjsLocaleMap: Record<string, string> = {
  zh_CN: 'zh-cn',
  en_US: 'en',
  ru_RU: 'ru',
};

dayjs.locale(dayjsLocaleMap[props.lang]);

const attrs = useAttrs();
// 传入的配置覆盖默认配置
const getBindValue = computed(() => {
  return deepMerge(
    {
      locale: antDesignI18n[props.lang as AntDesignLocaleType],
      ...commonConfig,
    },
    removeEmpty({ ...unref(attrs), ...props }),
  );
});

let prefix = ref<string>((props.prefixCls as string) || 'ant');

provide(configProviderInjectionKey, {
  clsPrefixRef: prefix,
});

ConfigProvider.config({
  prefixCls: prefix,
});

mountStyle('-ll-config-provider', commonStyle, prefix.value);
mountStyle('-ll-config-provider-basic', basicStyle, prefix.value);
mountStyle('-ll-config-provider-common', expandComponents, prefix.value);
mountStyle('-ll-config-provider-exception', exception, prefix.value, 'title');
</script>
