<template>
  <div id="app">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
    <component :is="layout">
      <router-view/>  
    </component>
  </div>
</template>

<script>
import RegisterLayout from '@/layouts/RegisterLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  name: 'App',
  components: {
    RegisterLayout,
    MainLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'register') + '-layout'
    }
  }
}
</script>

<style>
@import url('http://fonts.fontstorage.com/import/gilroy.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #444444;
  padding: 0;
}
</style>
