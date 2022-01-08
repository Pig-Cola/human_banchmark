<template>
  <div id="app">
    <page-header />
    <router-view />
  </div>
</template>

<script>
import PageHeader from '@/components/header'

export default {
  name: 'App',
  components: { PageHeader },
}
</script>

<style lang="scss">
#app {
  width: 100%;

  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
}
</style>
