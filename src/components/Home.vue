<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div>
    <h1>Available routes:</h1>
    <ul>
      <li>
        <router-link to="/users">/users</router-link>
      </li>
      <li>
        <router-link to="/users/add">/users/add</router-link>
      </li>
    </ul>
    <div>
      <h2>This is a grid</h2>
      <Grid v-if="game.grid" :grid="game.grid" />
    </div>
  </div>
</template>

<script>
import { createGame } from '@services/MinesWheeperClient.js'

import Grid from '@components/Grid.vue'

export default {
  components: {
    Grid
  },
  data() {
    return {
      game: {}
    }
  },
  methods: {
    createGame
  },
  mounted: async function() {
    this.game = await this.createGame()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
