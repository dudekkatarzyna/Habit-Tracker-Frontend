import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import VueRouter from "vue-router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HomeView from "@/views/HomeView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";

Vue.config.productionTip = true
Vue.use(VueRouter);
Vue.use(BootstrapVue);


const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView }
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`

})

new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
