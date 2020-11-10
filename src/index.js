import './style/init.css'
import './elementUi.js'
import './vueResource.js'
import Vue from 'vue'
import App from './components/App.vue'
import router from './router.js'
import store from './store.js'

(function () {
    let ele = document.querySelector("meta[name='viewport']");
    let width = window.innerWidth || document.documentElement.clientWidth;
    let scale = width / 1360;
    const content = 'width=1360, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', viewport-fit=cover'
    ele.content = content;
})()


new Vue({
    render: function (h) {
        return h(App);
    },
    router,
    store
}).$mount("#app");