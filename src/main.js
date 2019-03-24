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
import Vuex from "vuex";
import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'

import redirectToHomeIfNotLoggedIn from "./middleware/redirectToHomeIfNotLoggedIn";
import redirectToDashboardOrAdminIfLoggedIn from "./middleware/redirectToDashboardOrAdminIfLoggedIn";
import redirectToHomeIfNotLoggedInAsAdmin from "./middleware/redirectToHomeIfNotLoggedInAsAdmin";


Vue.config.productionTip = true
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        userId: null,
        isAdmin: false
    },
    plugins: [createPersistedState()],
    mutations: {
        setUserId(state, userId) {
            console.log(userId);
            state.userId = userId;
        },
        resetUserId(state) {
            state.userId = null;
        },
        setAdmin(state, admin) {
            state.isAdmin = admin;
        },
        resetAdmin(state) {
            state.isAdmin = false;
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        }
    }
});

const routes = [
    {
        path: '/',
        component: HomeView,
        beforeEnter: (to, from, next) => {
            if (redirectToDashboardOrAdminIfLoggedIn() === 'admin') {
                next('/admin')
            } else if (redirectToDashboardOrAdminIfLoggedIn() === 'dashboard') {
                next('/dashboard')
            }
        }
    },
    {
        path: '/dashboard',
        component: DashboardView,
        beforeEnter: (to, from, next) => {
            if (redirectToHomeIfNotLoggedIn()) {
                next();
            } else {
                next('/')
            }
        }
    },
    {
        path: '/admin', component: AdminView, beforeEnter: (to, from, next) => {
            if (redirectToHomeIfNotLoggedInAsAdmin()) {
                next();
            } else {
                next('/')
            }
        }
    },
    {path: '/login', component: LoginView},
    {path: '/register', component: RegisterView}
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`

});


new Vue({
    router,
    store,
    render: h => h(App),

}).$mount('#app')



