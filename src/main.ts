import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss';
import * as ElIcons from '@element-plus/icons-vue'; //element plus图标
import pinia from './store';
import { IconPark } from '@icon-park/vue-next/es/all';
import '@icon-park/vue-next/styles/index.css';

const app = createApp(App);
// 全局注册element-plus图标
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name]);
}
app.component('IconPark', IconPark);
app.use(pinia);
app.use(ElementPlus);
app.use(router);

app.mount('#app');
