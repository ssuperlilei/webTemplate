import { withInstall } from '~/_utils';
import ConfigProvider from './index.vue';

export const defaultClsPrefix = 'ant';

export const LConfigProvider = withInstall(ConfigProvider);
export default LConfigProvider;
export * from './ConfigProvider.type';
export * from './hooks';
export * from './common';
