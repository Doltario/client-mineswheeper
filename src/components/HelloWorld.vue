<template>
  <!-- A template element accept only ONE root container == One div must contain everything -->
  <div>
    <h1>Available routes:</h1>
    <ul>
      <li>
        <router-link to="/users">/users</router-link>
      </li>
      <li>
        <router-link to="/users">/users/add</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
