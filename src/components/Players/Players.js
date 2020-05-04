export default {
  methods: {
    updateCoordinates: function(event) {
      this.$socket.client.emit('mouseMove', this.$store.state.players.me.socketId, { x: event.pageX, y: event.pageY })
    },
  },
  created() {
    let suspended = false
    window.addEventListener('mousemove', (event) => {
      if (suspended) return
      suspended = true
      this.updateCoordinates(event)
      setTimeout(() => (suspended = false), 200)
    })
  },
}
