import './style/init.css'
import './elementUi.js'
import Vue from 'vue'
import App from './components/App.vue'
import router from './router.js'


new Vue({
    render: function(h) {
        return h(App);
    },
    router
}).$mount("#app");