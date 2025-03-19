import type { App } from 'vue';
import {
  LButton,
  LConfigProvider,
  LPasswordInput,
  LForm,
  LEllipsis,
  LTable,
  LModalForm,
  installUseModal,
  LSignature,
  type HookModalProps,
} from './components';

export { version } from './version';

const components = [
  LButton,
  LConfigProvider,
  LPasswordInput,
  LForm,
  LEllipsis,
  LTable,
  LModalForm,
  LSignature,
];

function install(app: App, options?: HookModalProps) {
  components.forEach((component) => {
    app.use(component);
  });
  installUseModal(app, {
    ...options,
  });
}

export { install };

export * from './components';

export default {
  install,
};
