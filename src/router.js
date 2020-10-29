import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// let loginPage = () => import(/* webpackChunkName: "login" */ './components/loginPage.vue');
let loginPage = r => require.ensure([], r => require('./components/loginPage.vue'), 'login');
let mainPage = r => require.ensure([], r => require('./components/mainPage.vue'), 'mainPage');
let selfModule = r => require.ensure([], r => require('./components/selfModule.vue'), 'mainPage');
let searchModule = r => require.ensure([], r => require('./components/searchModule.vue'), 'mainPage');
let nav = r => require.ensure([], r => require('./components/nav.vue'), 'mainPage');

const router = new VueRouter({
    mode: "hash",
    routes: [
        { path: "", component: loginPage },
        { path: "/mainPage", component: mainPage, children: [
            { path: "", components: {
                module1: nav,
                module2: selfModule,
                module3: searchModule
            } }
        ]}
    ]
})

export default router;
