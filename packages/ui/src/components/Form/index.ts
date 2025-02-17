import Help from './src/components/Help.vue';
import FormItem from './src/FormItem.vue';
import Form from './src/Form.vue';
import { withInstall } from '~/_utils';

export * from './types/index';

export const LForm: ReturnType<typeof withInstall> = withInstall(Form);
export const LFormItem = withInstall(FormItem);
export const LHelp: ReturnType<typeof withInstall> = withInstall(Help);

export default LForm;
