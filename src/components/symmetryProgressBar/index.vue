<template>
  <div class="symmentry-progress-bar">
    <div class="back"></div>
    <div class="front" :style="style"></div>
  </div>
</template>

<script>
export default {
  name: 'SymmentryProgressBar',
  props: {
    ms: Number,
  },
  data() {
    return {
      /**@type {CSSStyleDeclaration} */
      hi: '',
    }
  },
  computed: {
    /**@type {()=>CSSStyleDeclaration} */
    style() {
      let animationDuration = `${this.ms}ms`
      return { animationDuration }
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@keyframes start-progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.symmentry-progress-bar {
  border-radius: 5px;
  position: relative;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  .back {
    width: 100%;
    height: 100%;
    position: absolute;

    background-color: #2673b3;
  }
  .front {
    width: 100%;
    height: 100%;
    position: absolute;

    background-color: #fff;

    animation-name: start-progress;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
}
</style>