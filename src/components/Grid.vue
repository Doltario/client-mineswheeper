<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div class="grid-container">
    <div>
      {{ bombsLeft }}
      <span v-if="$store.state.activeGame.activeGame.won === true">Win !</span>
      <span @click="resetGame()" v-if="$store.state.activeGame.activeGame.won === false">Try again</span>
    </div>
    <div class="grid-content" :style="`width: ${20 * $store.state.activeGame.activeGame.grid.width}px`">
      <div v-for="gridBox in $store.state.activeGame.activeGame.grid.boxes" v-bind:key="gridBox.index" class="box" @click="reveal(gridBox.index)" @contextmenu.prevent="toggleFlag(gridBox.index)">
        <div v-if="gridBox.isRevealed && gridBox.hasBomb === true && gridBox.isFlagged === false" class="bomb">
          T
        </div>
        <div v-if="gridBox.isFlagged === true" class="flagged">
          🇫🇷
        </div>
        <div v-if="gridBox.isRevealed && gridBox.hasBomb === false && gridBox.isFlagged === false" class="no-bomb">
          {{ nearBombs(gridBox) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    bombsLeft: function() {
      return (
        this.$store.state.activeGame.activeGame.grid.bombsNumber -
        this.$store.state.activeGame.activeGame.grid.boxes.filter(box => {
          return box.isFlagged
        }).length
      )
    }
  },
  methods: {
    reveal: function(boxIndex) {
      const { activeGame } = this.$store.state.activeGame
      const box = activeGame.grid.boxes[boxIndex]

      if (activeGame.ended || box.isRevealed || box.isFlagged) return

      this.$store
        .dispatch('clickBox', boxIndex)
        .then(() => {
          // FIXME: this.$socket.io.nsps['/minesweeper'] is a workaround.
          // It should be this.$socket.minesweeper but it is not working properly.
          // Might open an issue on github later.

          this.$socket.io.nsps['/minesweeper'].emit('CLICK_BOX', boxIndex, activeGame._id)
        })
        .catch(error => {
          console.error(`An error occured revealing box ${boxIndex}`, error)
        })
    },
    toggleFlag: function(boxIndex) {
      const { activeGame } = this.$store.state.activeGame
      const box = activeGame.grid.boxes[boxIndex]

      if (activeGame.ended || box.isRevealed) return

      this.$store
        .dispatch('toggleFlag', boxIndex)
        .then(() => {
          // FIXME: this.$socket.io.nsps['/minesweeper'] is a workaround.
          // It should be this.$socket.minesweeper but it is not working properly.
          // Might open an issue on github later.

          this.$socket.io.nsps['/minesweeper'].emit('TOGGLE_FLAG', boxIndex, activeGame._id)
        })
        .catch(error => {
          console.error(`An error occured toggling flag on box ${boxIndex}`, error)
        })
    },
    nearBombs: function(gridBox) {
      // TODO: Implemented several times, check if it is not possible to de-duplicate
      return gridBox.neighbors.filter(boxIndex => {
        return this.$store.state.activeGame.activeGame.grid.boxes[boxIndex].hasBomb
      }).length
    },
    resetGame: function() {
      // felix@NOTE: avoid destructuring object, VueJS does not handling reactivity well with that
      const { activeGame } = this.$store.state.activeGame
      
      this.$store
        .dispatch('resetGame', activeGame._id)
        .then(() => {
          // FIXME: this.$socket.io.nsps['/minesweeper'] is a workaround.
          // It should be this.$socket.minesweeper but it is not working properly.
          // Might open an issue on github later.          
          this.$socket.io.nsps['/minesweeper'].emit('RESET_GAME', this.$store.state.activeGame.activeGame, this.$store.state.activeGame.activeGame._id)
        })
        .catch(error => {
          console.error(`An error occured while resetting game ${activeGame._id}`, error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-container {
  width: 100%;
  height: 100%;

  .grid-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;

    .box {
      height: 20px;
      width: 20px;
      background-color: lightgrey;
      border: 1px solid black;
      display: flex;
      justify-content: center;
      align-content: center;
      cursor: pointer;
      user-select: none;
    }

    .no-bomb {
      background-color: green;
      width: 100%;
      text-align: center;
    }

    .bomb {
      background-color: red;
      width: 100%;
      text-align: center;
    }

    .flagged {
      background-color: orange;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
