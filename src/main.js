// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuelidate)

/* eslint-disable no-new */

let app
app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app')