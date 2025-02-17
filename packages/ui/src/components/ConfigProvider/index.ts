import { withInstall } from '~/_utils';
import ConfigProvider from './src/index.vue';

export const LLConfigProvider = withInstall(ConfigProvider);
export default LLConfigProvider;
export * from './ConfigProvider.type';
export * from './hooks';
