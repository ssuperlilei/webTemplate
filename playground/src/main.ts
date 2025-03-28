import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
// 引入antdv
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// 引入@ssuperlilei/ui
import ll_libUI from '~@ssuperlilei/ui';
import '@ssuperlilei/ui/style.css';
// import { globalRegister } from '~@ssuperlilei/directives';

const app = createApp(App);
app.use(Antd); // 全局引入antdv组件
app.use(ll_libUI, {
  drag: false,
}); // 全局引入@ssuperlilei/ui组件
// globalRegister(app); // 全局引入@ssuperlilei/directives指令
app.use(router);
app.mount('#app');
