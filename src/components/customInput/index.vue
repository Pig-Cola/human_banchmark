<template>
  <input
    class="custom-input"
    ref="input"
    type="text"
    v-model="inputText"
    @keydown.enter="keydownEnter()"
    @input="handleInput()"
    @focus="focus()"
    @blur="blur()"
  />
</template>

<script>
export default {
  name: 'CustomInput',
  data() {
    return {
      inputText: '',
    }
  },

  computed: {
    /**@type {()=>Vue | Element | HTMLInputElement} */
    input() {
      return this.$refs.input
    },
  },

  methods: {
    handleInput() {
      this.$emit('input', this.inputText)
    },
    keydownEnter() {
      this.handleInput()
      this.blur()
      this.$emit('keydownEnter')
    },

    focus() {
      this.input.focus()
      this.$emit('focus')
    },
    blur() {
      this.input.blur()
      this.$emit('blur')
    }
  },
}
</script>

<style lang="scss" scoped>
.custom-input {
  font-family: 'Nanum Gothic', sans-serif;
  text-align: center;

  border: 0;
  border-radius: 3px;
  background-color: #2673b3;

  &:focus {
    outline: 2px solid #87ceeb;
  }

  &.err {
    outline: 2px solid #ff5555;
  }
}
</style>