import Vue from 'vue'
import App from './App.vue'
import { router } from './router/router'
import store from '@store'
import './global.scss'

Vue.config.productionTip = false

import VueSocketIO from 'vue-socket.io'

Vue.use(
  new VueSocketIO({
    debug: process.env.VUE_APP_NODE_ENV,
    connection: process.env.VUE_APP_SOCKET_URL,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
      useConnectionNamespace: true
    }
    // options: { path: '/' } //Optional options
  })
)

new Vue({
  router,
  store,
  sockets: {
    connect: () => {
      console.info('Socket connected')
    }
  },
  render: h => h(App)
}).$mount('#app')
