<template>
  <div>
    <h1>All users:</h1>
    <ul>
      <li v-for="user in users" v-bind:key="user.id">
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    }
  },
  methods: {
    async getUsers() {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/users`)
        const jsonResponse = await response.json()
        this.users = jsonResponse.users
      } catch (error) {
        console.error(`Cannot fetch: ${error}`)
      }
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
