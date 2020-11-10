import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// let loginPage = () => import(/* webpackChunkName: "login" */ './components/loginPage.vue');
let loginPage = r => require.ensure([], r => require('./components/loginPage.vue'), 'login');
let mainPage = r => require.ensure([], r => require('./components/mainPage.vue'), 'mainPage');
let selfModule = r => require.ensure([], r => require('./components/selfModule.vue'), 'mainPage');
let searchGameModule = r => require.ensure([], r => require('./components/searchGameModule.vue'), 'mainPage');
let nav = r => require.ensure([], r => require('./components/nav.vue'), 'mainPage');
let gameModule = r => require.ensure([], r => require('./components/gameModule.vue'), 'gameModule');
let writeShare = r => require.ensure([], r => require('./components/writeShare.vue'), 'writeShare');
let shareModule = r => require.ensure([], r => require('./components/shareModule.vue'), 'shareModule');
let searchUser = r => require.ensure([], r => require('./components/searchUser.vue'), 'searchUser');
let friendModule = r => require.ensure([], r => require('./components/friendModule.vue'), 'friendModule');
let adminLoginPage = r => require.ensure([], r => require('./adminComponents/adminLoginPage.vue'), 'adminLoginPage');



const router = new VueRouter({
    mode: "hash",
    routes: [
        { path: "", component: loginPage },
        { path: "/adminLoginPage", component: adminLoginPage },
        {
            path: "/mainPage", component: mainPage, children: [
                {
                    path: "", components: {
                        module1: nav,
                        module2: selfModule,
                        module3: searchGameModule
                    }
                },
                {
                    path: "gameModule", components: {
                        module1: nav,
                        module2: selfModule,
                        module3: gameModule
                    }
                },
                {
                    path: "writeShare", components: {
                        module1: nav,
                        module2: selfModule,
                        module3: writeShare
                    }
                },
                {
                    path: "shareModule", components: {
                        module1: nav,
                        module2: selfModule,
                        module3: shareModule
                    }
                },
                {
                    path: "searchUser", components: {
                        module1: nav,
                        module2: selfModule,
                        module3: searchUser
                    }
                },
                {
                    path: "friendModule", components: {
                        module1: nav,
                        module2: selfModule,
                        module3: friendModule
                    }
                }
            ]
        }
    ]
})

export default router;
