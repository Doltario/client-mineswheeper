<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div>
    <h1>Available routes:</h1>
    <ul>
      <li>
        <router-link to="/users">/users</router-link>
      </li>
      <li>
        <router-link to="/users/add">/users/add</router-link>
      </li>
    </ul>
    <div>
      <h2>This is a grid</h2>
      <div>
        <p>{{ a }}</p>
        <button @click="a++">a++</button>
        <p>{{ b }}</p>
        <button @click="b++">b++</button>
        <p>{{ c }}</p>
        <button @click="c++">c++</button>
      </div>
      <Grid :grid="$data.game.grid" />
    </div>
  </div>
</template>

<script>
import { MinesWheeper } from '@services/MinesWheeper.js'

import Grid from '@components/Grid.vue'

function defineNonReactiveProperties(target, properties) {
  for (const k in properties) {
    const value = properties[k]
    const opts = {
      configurable: false
      // enumerable: true
    }
    if (value !== null && (typeof value.get === 'function' || typeof value.set === 'function')) {
      opts.get = value.get
      opts.set = value.set
    } else {
      opts.writable = true
      opts.value = value
    }
    Object.defineProperty(target, k, opts)
  }
}

const nonReactiveData = {
  a: 0
}

export default {
  components: {
    Grid
  },
  data() {
    defineNonReactiveProperties(nonReactiveData, {
      game: new MinesWheeper(30, 30, 40),
      b: 0,
      c: {
        get() {
          return this.b * 2
        },
        set() {
          this.a += 2
        }
      }
    })

    return nonReactiveData
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
