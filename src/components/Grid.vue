<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div class="grid-container">
    <div>
      {{ bombsleft }}
      <!-- <span v-if="grid._gameWon === true">Win !</span>
      <span v-if="grid._gameWon === false">Try again</span> -->
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
          {{ gridBox.nearBombs }}
        </div>
      </div>
    </div>

    <br />
    <div class="grid-content" :style="`width: ${20 * grid.width}px`">
      <div v-for="gridBox in grid.boxes" v-bind:key="gridBox.index" class="box">
        {{ gridBox.index }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['grid'],
  data() {
    return {
      bombsleft:
        this.grid.bombsNumber -
        this.grid.boxes.filter(box => {
          return box.isFlagged
        }).length
    }
  },
  methods: {
    reveal: () => {
      console.log('TODO: reveal')
    },
    toggleFlag: () => {
      console.log('TODO: toggleFlag')
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
