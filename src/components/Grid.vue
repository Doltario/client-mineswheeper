<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div class="grid-container">
    <div class="grid-content" :style="`width: ${20 * gameGrid.width }px`">
      <div v-for="gridBox in gameGrid.grid" v-bind:key="gridBox.id" class="box">
        <div v-if="gridBox.hasBomb === true">
          T
        </div>
      </div>
    </div>
    <pre>{{ gameGrid }}</pre>  
  </div>
</template>

<script>
export default {
  props: ["gameGrid"]
};
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
    }
  }
</style>
