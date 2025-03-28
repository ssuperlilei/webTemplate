import type { App } from 'vue';
import vFocus from './v-focus';
import vLazy from './v-lazy';

const directives = {
  vFocus,
  vLazy,
};
export { version } from './version';

export type DirectiveKeys = keyof typeof directives;

const globalRegister = (app: App, directiveKeys?: DirectiveKeys[]): void => {
  if (directiveKeys) {
    directiveKeys.forEach((key) => {
      const directive = directives[key];
      if (directive) {
        const directiveName = key.startsWith('v') ? key.substring(1) : key;
        app.directive(directiveName, directive);
      }
    });
    return;
  } else {
    Object.keys(directives).forEach((name) => {
      const directiveName = name.startsWith('v') ? name.substring(1) : name;
      app.directive(directiveName, directives[name as keyof typeof directives]);
    });
  }
};
export { vFocus, vLazy, globalRegister };

export default directives;
