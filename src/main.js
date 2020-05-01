import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import App from './App.vue'
import { router } from './router/router'
import store from '@store'
import './global.scss'

Vue.config.productionTip = false

const socket = io(process.env.VUE_APP_SOCKET_URL)

Vue.use(VueSocketIOExt, socket, { store })

new Vue({
  router,
  store,
  sockets: {
    connect: () => {
      console.info('Socket connected')
    },
    disconnect: () => {
      console.info('Socket disconnected')
    },
  },
  render: (h) => h(App),
}).$mount('#app')
