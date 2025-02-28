<template>
  <ConfigProvider v-bind="getBindValue">
    <template #renderEmpty>
      <div style="text-align: center">
        <InfoCircleOutlined />
        <p>{{ t('暂无数据') }}</p>
      </div>
    </template>
    <slot />
  </ConfigProvider>
</template>

<script lang="tsx" setup>
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import { deepMerge, removeEmpty } from '@ssuperlilei-lib/utils';
import { ConfigProvider } from 'ant-design-vue';
import { computed, provide, ref, unref, useAttrs } from 'vue';
import { configProviderInjectionKey, llPropsKey } from './hooks/context';
import { llConfigProviderProps } from './ConfigProvider.type';
import commonConfig from './common/config';
import antDesignI18n, { type AntDesignLocaleType } from './common/antDesignI18n';
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { t } from '@ssuperlilei-lib/i18n';
import { basicStyle, commonStyle, exceptionStyle, expandComponentsStyle } from './style';

defineOptions({
  name: 'LConfigProvider',
});

const props = defineProps(llConfigProviderProps);
const dayjsLocaleMap: Record<string, string> = {
  zh_CN: 'zh-cn',
  en_US: 'en',
  ru_RU: 'ru',
};

dayjs.locale(dayjsLocaleMap[props.lang]);

const attrs = useAttrs() as Record<string, unknown>;
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

const prefix = ref<string>((props.prefixCls as string) || 'ant');

provide(configProviderInjectionKey, {
  clsPrefixRef: prefix,
});

provide(llPropsKey, {
  ...props.llProps,
});

ConfigProvider.config({
  prefixCls: prefix,
});

commonStyle(prefix.value);
basicStyle(prefix.value);
expandComponentsStyle(prefix.value);
exceptionStyle(prefix.value);
</script>
