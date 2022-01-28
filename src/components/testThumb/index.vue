<template>
  <div class="thumb-area" @click="clickThumb">
    <div class="icon">
      <my-icon>{{ testIcon }}</my-icon>
    </div>
    <div class="title">{{ testTitle }}</div>
  </div>
</template>

<script>
import utill from '@/utill'

export default {
  name: 'TestThumb',
  props: {
    testType: String,
  },

  computed: {
    /**@type {()=>utill.types.testInfo*/
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
    /**@type {()=>string} */
    testDescription() {
      return this.testInfo.description
    },
  },

  methods: {
    clickThumb() {
      let name = this.testType[0].toUpperCase() + this.testType.slice(1)
      this.$router.push({ name })
    },
  },
}
</script>

<style lang="scss" scoped>
.thumb-area {
  width: 200px;
  height: 70px;

  display: grid;
  grid-template-areas: 'icon title';
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);

  border-radius: 7px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  transition: transform 400ms, box-shadow 400ms;
  cursor: pointer;
  user-select: none;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 1px 11px 20px 3px rgba(0, 0, 0, 0.25);

    .icon {
      .my-icon {
        color: #ffa500;
      }
    }
  }

  .icon {
    grid-area: icon;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    border-right: 1px solid rgba(0, 0, 0, 0.25);

    .my-icon {
      transition: color 300ms;

      font-size: 30px;
      color: #95d4ed;
    }
  }
  .title {
    grid-area: title;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    font-weight: bold;
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>