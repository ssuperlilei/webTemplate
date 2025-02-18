import type { App } from 'vue';
import { VButton, VDialog, LConfigProvider, LPasswordInput, LForm } from './components';

export { version } from './version';

const components = [VButton, VDialog, LConfigProvider, LPasswordInput, LForm];

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
