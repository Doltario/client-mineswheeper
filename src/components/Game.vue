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

export default {
  components: {
    Grid
  },
  data() {
    return {
      game: this.$store.state.activeGame.activeGame
    }
  },
  created: function() {
    if (this.$route.params.gameId) {
      console.log(`TODO: Fetch game with id ${this.$route.params.gameId}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
