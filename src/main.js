import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import VueRouter from "vue-router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import DashboardView from "@/views/DashboardView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import AdminView from "@/views/AdminView";
import HomeView from "@/views/HomeView";

import redirectToHomeIfNotLoggedIn from "./middleware/redirectToHomeIfNotLoggedIn";

Vue.config.productionTip = true
Vue.use(VueRouter);
Vue.use(BootstrapVue);


const routes = [
    {path: '/', component: HomeView},
    {
        path: '/dashboard',
        component: DashboardView,
        beforeEnter: (to, from, next) => {
            console.log('herh')
            redirectToHomeIfNotLoggedIn()
        }
    },
    {path: '/admin', component: AdminView, meta: {middleware: redirectToHomeIfNotLoggedIn}},
    {path: '/login', component: LoginView},
    {path: '/register', component: RegisterView}
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`

});

router.beforeEach((to, from, next) => {
    // ...
})

new Vue({
    router,
    render: h => h(App),

}).$mount('#app')


