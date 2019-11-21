import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
import Users from './components/Users.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/users', component: Users }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
