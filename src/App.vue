<template>
  <div id="app">
    <vux-datepicker lang="bn"/>
  </div>
</template>

<script>
import VuxDatepicker from './components/VuxDatepicker'

export default {
  name: 'App',
  components: {
    VuxDatepicker
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
