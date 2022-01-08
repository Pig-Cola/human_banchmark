<template>
  <div class="play" @mousedown="playClick($event)">
    <div class="play-area">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Play',
    methods: {
        playClick(event) {
            this.$emit('mousedown', event)
        }
    }
}
</script>

<style lang="scss" scoped>
.play {
  width: 100%;
  height: 600px;

  display: flex;
  align-items: center;
  justify-content: center;

  user-select: none;
  background-color: #2b87d1;
  padding-top: 50px;
  padding-bottom: 50px;

  .play-area {
    width: 50%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>