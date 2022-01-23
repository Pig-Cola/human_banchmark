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
@font-face {
  font-family: 'SANGJUGyeongcheonIsland';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/SANGJUGyeongcheonIsland.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}
@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);

#app {
  width: 100%;
  height: 100%;

  font-family: 'Nanum Gothic', sans-serif;

  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
}
</style>
