import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
//引入公用样式
import '@/style/common.less'

Vue.config.productionTip = false;
//注册组件
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
