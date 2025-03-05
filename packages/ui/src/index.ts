import type { App } from 'vue';
import {
  LButton,
  LConfigProvider,
  LPasswordInput,
  LForm,
  LEllipsis,
  LTable,
  LModalForm,
} from './components';

export { version } from './version';

const components = [LButton, LConfigProvider, LPasswordInput, LForm, LEllipsis, LTable, LModalForm];

function install(app: App) {
  components.forEach((component) => {
    app.use(component);
  });
}

export { install };

export * from './components';

export default {
  install,
};
