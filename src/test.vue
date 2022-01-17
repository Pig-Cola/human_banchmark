<template>
  <div class="main">{{ compB }}</div>
</template>

<script>
import Test from '@/components/test'

export default {
  name: 'Main',
  components: { Test },

  data() {
    return {
      dataA: true,
      dataB: {
        foo: 'bar',
      },
      dataC: ['hi', 'hello'],
    }
  },

  mounted() {
    this.dataC.push(this.hi())
  },

  computed: {
    /**@type {()=>string} */
    compA() {
      return this.dataB.foo
    },
    /**@type {()=>string} */
    compB() {
      return this.dataC.join('-') + this.compA
    },
  },

  methods: {
    hi() {
      return this.compA
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>