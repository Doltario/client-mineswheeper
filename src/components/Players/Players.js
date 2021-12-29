export default {
  methods: {
    updateCoordinates: function(event) {
      this.$socket.client.emit('mouseMove', this.$store.state.players.me.socketId, { x: event.pageX, y: event.pageY })
    },
  },
  created() {
    window.addEventListener('mousemove', (event) => {
      window.requestAnimationFrame(this.updateCoordinates(event))
    })
  },
}
