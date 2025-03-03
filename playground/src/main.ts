import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
// 引入antdv
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// 引入@ssuperlilei-lib/ui
import ll_libUI from '@ssuperlilei-lib/ui';
import '@ssuperlilei-lib/ui/style.css';
// import { globalRegister } from '@ssuperlilei-lib/directives';

const app = createApp(App);
app.use(Antd); // 全局引入antdv组件
app.use(ll_libUI); // 全局引入@ssuperlilei-lib/ui组件
// globalRegister(app); // 全局引入@ssuperlilei-lib/directives指令
app.use(router);
app.mount('#app');
