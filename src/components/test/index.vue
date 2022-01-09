<template>
  <div class="test">
    <reaction v-if="testType === 'reaction'"></reaction>
  </div>
</template>

<script>
import Reaction from './reaction'

export default {
  name: 'Test',
  components: { Reaction },
  props: {
    testType: {
      type: String,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.test{
  width: 100%;
  height: 100%;
}
</style>