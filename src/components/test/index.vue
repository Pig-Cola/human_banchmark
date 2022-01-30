<template>
  <div class="test">
    <reaction v-if="testType === 'reaction'"></reaction>
    <sequence v-else-if="testType === 'sequence'"></sequence>
    <word v-else-if="testType === 'word'"></word>
    <number v-else-if="testType === 'number'"></number>
    <aim v-else-if="testType === 'aim'"></aim>
  </div>
</template>

<script>
import Reaction from './reaction'
import Sequence from './sequence'
import Word from './word'
import Number from './number'
import Aim from './aim'

export default {
  name: 'Test',
  components: { Reaction, Sequence, Word, Number, Aim },
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
}
</style>