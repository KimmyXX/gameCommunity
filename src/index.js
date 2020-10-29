import './style/init.css'
import './elementUi.js'
import './vueResource.js'
import Vue from 'vue'
import App from './components/App.vue'
import router from './router.js'
import store from './store.js'


new Vue({
    render: function(h) {
        return h(App);
    },
    router,
    store
}).$mount("#app");