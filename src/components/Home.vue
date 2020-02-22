<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div>
    <!-- <h1>Available routes:</h1>
    <ul>
      <li>
        <router-link to="/users">/users</router-link>
      </li>
      <li>
        <router-link to="/users/add">/users/add</router-link>
      </li>
    </ul> -->
    <div>
      <!-- <h2>This is a grid</h2> -->
      <Grid v-if="game && game.grid" />
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
  mounted: function() {
    this.$store
      .dispatch('createGame')
      .then(res => {
        this.game = res
      })
      .catch(error => {
        console.error('Cannot create game', error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
