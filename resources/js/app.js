import './bootstrap';
import './index.css';
import 'ant-design-vue/dist/antd.css';
import Antd from "ant-design-vue";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store';

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Antd)
app.mount("#app")