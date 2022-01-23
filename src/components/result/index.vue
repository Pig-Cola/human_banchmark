<template>
  <div class="result">
    <div class="test-icon">
      <my-icon>{{ testIcon }}</my-icon>
    </div>
    <div class="test-type">{{ testTitle }}</div>
    <div class="test-msg">
      <slot></slot>
    </div>
    <div class="btns">
      <div @click="clickRetry()" class="retry">다시하기</div>
      <div @click="clickSave()" class="save">결과저장</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: {
    testType: String,
  },

  computed: {
    /**@type { ()=>{icon:string, title:string, description:string} } */
    testInfo() {
      return this.$store.getters.info(this.testType)
    },

    /**@type {()=>string} */
    testIcon() {
      return this.testInfo.icon
    },
    /**@type {()=>string} */
    testTitle() {
      return this.testInfo.title
    },
  },

  methods: {
    clickRetry() {
      this.$emit('retry')
    },
    clickSave() {
      this.$emit('save')
    },
  },
}
</script>

<style lang="scss" scoped>
.result {
  width: 50%;
  height: 100%;

  display: grid;
  grid-template-areas:
    'test-icon'
    'test-type'
    'test-msg'
    'btns';
  grid-template-rows: minmax(0, 2fr) minmax(0, 3fr) minmax(0, 6fr) 50px;
  grid-template-columns: minmax(0, 1fr);
  align-content: center;
  justify-content: center;
  row-gap: 10px;

  color: #fff;

  .test-icon {
    grid-area: test-icon;

    display: flex;
    align-items: center;
    justify-content: center;

    .my-icon {
      font-size: 60px;
    }
  }
  .test-type {
    grid-area: test-type;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 60px;
    font-weight: bold;
  }
  .test-msg {
    grid-area: test-msg;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    font-size: 20px;
  }
  .btns {
    grid-area: btns;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    color: #000;

    .retry,
    .save {
      flex: none;
      width: 120px;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: #ffff00;
      cursor: pointer;
      border-radius: 7px;

      &:hover {
        background-color: #ffffff;
      }
    }
  }
}
</style>