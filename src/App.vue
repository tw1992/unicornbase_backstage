<template>
  <div id="app">
    <navSide></navSide>
  </div>
</template>

<script>
import navSide from './components/sideNav.vue'
export default {
  name: 'App',
  components:{
    navSide
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
