<template>
  <i class="my-icon" :class="iconClass" v-on="$listeners"></i>
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

  methods: {},
}
</script>

<style lang="scss" scoped>
.my-icon {
  user-select: none;
}
</style>