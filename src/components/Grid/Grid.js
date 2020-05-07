import Navigation from '@components/Navigation/Navigation.vue'

export default {
  components: {
    Navigation,
  },
  computed: {
    bombsLeft: function() {
      return (
        this.$store.state.activeGame.activeGame.grid.bombsNumber -
        this.$store.state.activeGame.activeGame.grid.boxes.filter((box) => {
          return box.isFlagged
        }).length
      )
    },
  },
  methods: {
    reveal: function(boxIndex) {
      const box = this.$store.state.activeGame.activeGame.grid.boxes[boxIndex]

      if (this.$store.state.activeGame.activeGame.ended || box.isRevealed || box.isFlagged) return

      this.$store
        .dispatch('clickBox', boxIndex)
        .then(() => {
          this.$socket.client.emit('clickBox', boxIndex, this.$store.state.activeGame.activeGame._id)
        })
        .catch((error) => {
          console.error(`An error occured revealing box ${boxIndex}`, error)
        })
    },
    toggleFlag: function(boxIndex) {
      const box = this.$store.state.activeGame.activeGame.grid.boxes[boxIndex]

      if (this.$store.state.activeGame.activeGame.ended || box.isRevealed) return

      this.$store
        .dispatch('toggleFlag', boxIndex)
        .then(() => {
          this.$socket.client.emit('toggleFlag', boxIndex, this.$store.state.activeGame.activeGame._id)
        })
        .catch((error) => {
          console.error(`An error occured toggling flag on box ${boxIndex}`, error)
        })
    },
    nearBombs: function(gridBox) {
      // TODO: Implemented several times, check if it is not possible to de-duplicate
      return gridBox.neighbors.filter((boxIndex) => {
        return this.$store.state.activeGame.activeGame.grid.boxes[boxIndex].hasBomb
      }).length
    },
    resetGame: function() {
      this.$store
        .dispatch('resetGame', this.$store.state.activeGame.activeGame._id)
        .then(() => {
          this.$socket.client.emit('resetGame', this.$store.state.activeGame.activeGame, this.$store.state.activeGame.activeGame._id)
        })
        .catch((error) => {
          console.error(`An error occured while resetting game ${this.$store.state.activeGame.activeGame._id}`, error)
        })
    },
  },
}
