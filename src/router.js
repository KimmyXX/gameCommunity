import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// let loginPage = () => import(/* webpackChunkName: "login" */ './components/loginPage.vue');
let loginPage = r => require.ensure([], r => require('./components/loginPage.vue'), 'login');


const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "", component: loginPage }
    ]
})

export default router;
