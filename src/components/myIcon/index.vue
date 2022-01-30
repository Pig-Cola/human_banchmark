<template>
  <i class="my-icon" :class="iconClass" @click="click" @mousedown="mousedown"></i>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'MyIcon',

  computed: {
    /**@type {()=>string} */
    slotText() {
      return _.get(this.$slots, 'default[0].text', '').trim()
    },
    /**@type {()=>string} */
    iconClass() {
      return this.slotText ? 'icon-' + this.slotText : ''
    },
  },

  methods: {
    click(e) {
      this.$emit('click', e)
    },
    mousedown(e) {
      this.$emit('mousedown', e)
    },
  },
}
</script>

<style lang="scss" scoped>
.my-icon {
  user-select: none;
}
</style>