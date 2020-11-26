<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">comets logger</a>
    </nav>
    <div class="container">
      <log />
    </div>
  </div>
</template>

<script>
import log from  './components/log.vue'

export default {
  name: 'App',
  components: {
    log
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
