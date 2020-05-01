<template>
  <div>
    <div v-if="showNicknameSetter === false">
      <router-link to="/">Go back home</router-link>
      <Grid v-if="game && game.grid" />
      <div v-if="!game">Game not found</div>
      <!-- <Players /> felix@TODO: implement list of players -->
    </div>
    <div v-if="showNicknameSetter === true">
      <label for="nickname">Nickname</label>
      <input type="text" id="nickname" v-model="nickname" />
      <button @click="setNickame">Access game</button>
    </div>
  </div>
</template>

<script>
import Grid from '@components/Grid.vue'
import store from '@store'

export default {
  components: {
    Grid,
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
