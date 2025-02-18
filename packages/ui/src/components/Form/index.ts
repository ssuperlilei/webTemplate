import Help from './components/Help.vue';
import FormItem from './FormItem.vue';
import Form from './Form.vue';
import { withInstall } from '~/_utils';

export * from './types/index';

export const LForm = withInstall(Form);
export const LFormItem = withInstall(FormItem);
export const LHelp = withInstall(Help);

export default LForm;
