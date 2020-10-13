<template>
  <div id="app">
    <MainSearchmap title="Sucursales operativas"/>
  </div>
</template>

<script>
import MainSearchmap from './components/MainSearchmap.vue'

export default {
  name: 'App',
  components: {
    MainSearchmap
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
}
</style>
