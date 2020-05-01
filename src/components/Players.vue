<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div class="players-container">
    Connected players:
    <ul>
      <li :key="player.socketId" v-for="player in $store.state.players.others">
        {{ player.nickname }}
        <span v-if="player.socketId === $store.state.players.me.socketId">(You)</span>
        <div v-if="player.socketId !== $store.state.players.me.socketId" class="player-cursor" :style="{ top: player.position.y + 'px', left: player.position.x + 'px' }">V</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    updateCoordinates: function(event) {
      this.$socket.client.emit('mouseMove', this.$store.state.players.me.socketId, { x: event.pageX, y: event.pageY })
    },
  },
  created() {
    window.addEventListener('mousemove', this.updateCoordinates)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.players-container {
  width: 100%;
  height: 100%;

  .player-cursor {
    position: absolute;
  }
}
</style>
