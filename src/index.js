import './style/init.css'
import './style/init.scss'
import Vue from 'vue'
import App from './components/App.vue'


var vm = new Vue({
    render: function(h) {
        return h(App);
    }
}).$mount("#app");