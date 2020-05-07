import Navigation from '@components/Navigation/Navigation.vue'
import Grid from '@components/Grid/Grid.vue'
import Players from '@components/Players/Players.vue'
import store from '@store' // NOTE: Imported to use it in beforeRouteEnter

export default {
  components: {
    Navigation,
    Grid,
    Players,
  },
  data() {
    return {
      game: this.$store.state.activeGame.activeGame,
      showNicknameSetter: false,
      nickname: null,
    }
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.activeGame.activeGame._id === to.params.gameId) return next() // felix@NOTE: Do not fetch game if it is already in store

    store
      .dispatch('getGame', to.params.gameId)
      .then(next)
      .catch((error) => {
        console.error(`Cannot load game: ${error}`)
        next()
      })
  },
  beforeRouteLeave(to, from, next) {
    this.$socket.client.emit('leaveRoom', this.$store.state.activeGame.activeGame._id, this.$store.state.players.me)
    next()
  },
  created() {
    if (store.state.activeGame.activeGame.online) {
      if (!store.state.players.me || !store.state.players.me.nickname) {
        this.showNicknameSetter = true
      } else {
        this.$socket.client.emit('joinRoom', this.$store.state.activeGame.activeGame._id, this.$store.state.players.me)
      }
    }
  },
  methods: {
    setNickame: function() {
      store.dispatch('setSelfNickname', this.nickname)
      this.showNicknameSetter = false
      this.$socket.client.emit('joinRoom', this.$store.state.activeGame.activeGame._id, this.$store.state.players.me)
    },
  },
}
