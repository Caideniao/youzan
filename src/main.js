import Vue from 'vue'
import App from './App.vue'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'
import store from './store/index.js'
import VueRouter from 'vue-router'
import routes from './router/route.js'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(MintUI)

const router = new VueRouter({
  routes,
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

