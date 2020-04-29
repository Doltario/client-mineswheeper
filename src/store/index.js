import Vue from 'vue'
import Vuex from 'vuex'
import activeGame from './modules/activeGame'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    activeGame,
  },
  strict: debug,
})
