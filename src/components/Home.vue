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
      <!-- <pre>{{ gameGrid }}</pre> -->
      <Grid :gameGrid="gameGrid"/>
    </div>
  </div>
</template>

<script>
import { MinesWheeper } from "@services/MinesWheeper.js";

import Grid from "@components/Grid.vue";

export default {
  components: {
    Grid
  },
  data() {
    return {
      gameGrid: new MinesWheeper()
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
