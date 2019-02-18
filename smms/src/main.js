import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import '@/style/common.less'
Vue.use(ElementUI);
Vue.prototype.axios = axios
//全局路由守卫  拦截搜有路由
router.beforeEach((to, from, next) => {
  //获取token
  const token = window.localStorage.getItem('token')
  //判断 如果有token
  if (token) {
    //直接下一步
    next();
  } else {
    //否则没有
    //如果取得是login执行
    if (to.path === '/login') {
      next()
    } else {
      // 跳转到登录页面
      return next({"path":"/login" })
    }
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
