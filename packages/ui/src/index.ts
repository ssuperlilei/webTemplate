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

function install(app: App) {
  components.forEach((component) => {
    app.use(component);
  });
  installUseModal(app, {
    clsPrefix: 'ant',
    drag: true,
  });
}

export { install };

export * from './components';

export default {
  install,
};
