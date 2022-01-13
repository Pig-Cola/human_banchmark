<template>
  <div class="test">
    <reaction v-if="testType === 'reaction'"></reaction>
    <sequence v-else-if="testType === 'sequence'"></sequence>
  </div>
</template>

<script>
import Reaction from './reaction'
import Sequence from './sequence'

export default {
  name: 'Test',
  components: { Reaction, Sequence },
  props: {
    testType: {
      type: String,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.test {
  width: 100%;
  height: 100%;
}
</style>