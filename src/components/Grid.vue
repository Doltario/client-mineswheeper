<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div class="grid-container">
    <div class="grid-content" :style="`width: ${20 * grid.width}px`">
      <div v-for="gridBox in grid.boxes" v-bind:key="gridBox.id" class="box" @click="gridBox.reveal()">
        <div v-if="gridBox._isRevealed && gridBox.hasBomb === true" :class="`${gridBox._isRevealed ? 'red' : ''}`">
          T
        </div>
        <div v-if="gridBox._isRevealed && gridBox.hasBomb === null" :class="`${gridBox._isRevealed ? 'green' : ''}`">
          {{ gridBox.nearBombs }}
        </div>
      </div>
    </div>
    <br />
    <div>{{ grid.boxes[4].print() }}</div>
    <br />
    <div class="grid-content" :style="`width: ${20 * grid.width}px`">
      <div v-for="gridBox in grid.boxes" v-bind:key="gridBox.id" class="box" @click="gridBox.reveal()">
        {{ gridBox.index }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['grid']
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
    }

    .green {
      background-color: green;
      width: 100%;
      text-align: center;
    }
    .red {
      background-color: red;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
