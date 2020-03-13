<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div class="grid-container">
    <div>
      {{ bombsLeft }}
      <span v-if="$store.state.activeGame.activeGame.won === true">Win !</span>
      <span v-if="this.$store.state.activeGame.activeGame.won === false">Try again</span>
    </div>
    <div class="grid-content" :style="`width: ${20 * grid.width}px`">
      <div v-for="gridBox in grid.boxes" v-bind:key="gridBox.index" class="box" @click="reveal(gridBox.index)" @contextmenu.prevent="toggleFlag(gridBox.index)">
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
  data() {
    return {
      grid: this.$store.state.activeGame.activeGame.grid
    }
  },
  methods: {
    reveal: function(boxIndex) {
      this.$store
        .dispatch('reveal', boxIndex)
        .then(() => {
          const activeGame = this.$store.state.activeGame.activeGame
          const box = activeGame.grid.boxes[boxIndex]
          if (activeGame.ended || box.isFlagged) return
          // 1#FIXME: maybe move socket emit to store,
          // Because here state is already modified so we can't emit only if the box is not revealed because, here, it will always be revealed

          // 2#FIXME: this.$socket.io.nsps['/minesweeper'] is a workaround.
          // It should be this.$socket.minesweeper but it is not working properly.
          // Might open an issue on github later.
          this.$socket.io.nsps['/minesweeper'].emit('REVEAL', boxIndex, this.$store.state.activeGame.roomId)
        })
        .catch(error => {
          console.error(`An error occured revealing box ${boxIndex}`, error)
        })
    },
    toggleFlag: function(boxIndex) {
      this.$store.dispatch('toggleFlag', boxIndex).catch(error => {
        console.error(`An error occured toggling flag on box ${boxIndex}`, error)
      })
    },
    nearBombs: function(gridBox) {
      // TODO: Implemented several times, check if it is not possible to de-duplicate
      return gridBox.neighbors.filter(boxIndex => {
        return this.grid.boxes[boxIndex].hasBomb
      }).length
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
