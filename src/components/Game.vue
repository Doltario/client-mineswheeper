<template>
  <div>
    <div>
      <router-link to="/">Go back home</router-link>
      <Grid v-if="game && game.grid" />
      <div v-if="!game">Game not found</div>
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
  created() {
    if (store.state.activeGame.activeGame.online) {
      this.$socket.client.emit('joinRoom', this.$store.state.activeGame.activeGame._id)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
