import './style/init.css'
import './style/init.scss'
import './elementUi.js'
import Vue from 'vue'
import App from './components/App.vue'


new Vue({
    render: function(h) {
        return h(App);
    }
}).$mount("#app");