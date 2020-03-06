<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div>
    <router-link to="/">Go back home</router-link>
    <h1>New Game</h1>
    <div>
      <div>
        <label for="width">Grid width</label>
        <input type="text" name="width" v-model="width" />
      </div>
      <div>
        <label for="height">Grid height</label>
        <input type="text" name="height" v-model="height" />
      </div>
      <div>
        <label for="bombs-number">Bombs number</label>
        <input type="text" name="bombs-number" v-model="bombsNumber" />
      </div>

      <button @click="createGame">Create Game</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 10,
      height: 10,
      bombsNumber: 20
    }
  },
  methods: {
    createGame: function() {
      const { width, height, bombsNumber } = this

      this.$store
        .dispatch('createGame', { width, height, bombsNumber })
        .then(createdGame => {
          console.log('createdGame', createdGame)

          this.$router.push({ name: 'game', params: { gameId: createdGame._id } })
        })
        .catch(error => {
          console.error('Cannot create game', error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
