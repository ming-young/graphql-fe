<template lang='pug'>
div 

  GraphQL
</template>

<script>
import GraphQL from './pages/GraphQL.vue'
import code from './code.js'

export default {
  name: 'App',
  components: {
    GraphQL
  },
  data () {
    return {
      DD: code
    }
  },
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
