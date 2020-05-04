<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div>
    <router-link to="/">Go back home</router-link>
    <h1>New Game</h1>
    <div>
      <div>
        <label for="width">Grid width</label>
        <input type="text" id="width" v-model="width" />
      </div>
      <div>
        <label for="height">Grid height</label>
        <input type="text" id="height" v-model="height" />
      </div>
      <div>
        <label for="bombs-number">Bombs number</label>
        <input type="text" id="bombs-number" v-model="bombsNumber" />
      </div>
      <div>
        <div>
          <input type="radio" id="solo" name="online" v-model="online" :value="false" />
          <label for="solo">solo</label>
        </div>
        <div>
          <input type="radio" id="online" name="online" v-model="online" :value="true" />
          <label for="online">online</label>
        </div>
      </div>
      <div v-if="online === true">
        <label for="nickname">Nickname</label>
        <input type="text" id="nickname" v-model="nickname" />
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
      bombsNumber: 20,
      online: false,
      nickname: 'Lama intrépide',
    }
  },
  methods: {
    createGame: function() {
      const { width, height, bombsNumber, online, nickname } = this

      this.$store
        .dispatch('createGame', { width, height, bombsNumber, online, nickname })
        .then((createdGame) => {
          this.$router.push({ name: 'game', params: { gameId: createdGame._id } })
        })
        .catch((error) => {
          console.error('Cannot create game', error)
        })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
