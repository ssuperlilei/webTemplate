import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
// 引入antdv
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// 引入@ll_lib/ui
import ll_libUI from '@ll_lib/ui';
import '@ll_lib/ui/style.css';

const app = createApp(App);
app.use(Antd); // 全局引入antdv组件
app.use(ll_libUI); // 全局引入@ll_lib/ui组件
app.use(router);
app.mount('#app');
