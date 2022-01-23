<template>
  <div class="main">
    <play class="play">
      <div class="play-area">
        <div class="icon">
          <my-icon :key="testIcon">{{ testIcon }}</my-icon>
        </div>
        <div class="title">{{ testTitle }}</div>
        <div v-html="testDescription" class="description"></div>
        <div class="start-btn" @click="startClick()">시작</div>
      </div>
    </play>
    <!-- select slot -->
    <div v-if="testType === 'banchmark'" class="select-test-area">
      <div class="thumb-wrapper">
        <test-thumb v-for="type in typeList" :testType="type" :key="type"></test-thumb>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import utill from '@/utill'

import Play from '@/components/play'
import Test from '@/components/test'
import TestThumb from '@/components/testThumb'

export default {
  name: 'Main',
  components: { Play, Test, TestThumb },
  props: {
    testType: {
      type: String,
      default: 'banchmark',
    },
  },

  computed: {
    /**@type { ()=>utill.types.testInfo } */
    testInfo() {
      return this.$store.getters.info(this.testType)
    },
    /**@type { ()=>string[] } */
    typeList() {
      return this.$store.getters.typeList
    },

    /**@type { ()=>string } */
    testIcon() {
      return this.testInfo.icon
    },
    /**@type { ()=>string } */
    testTitle() {
      return this.testInfo.title
    },
    /**@type { ()=>string } */
    testDescription() {
      return utill.textLineSpace(this.testInfo.description)
    },

    /**@type { ()=>boolean } */
    isPlayed() {
      return this.testType !== 'banchmark' && this.play
    },
  },

  methods: {
    startClick() {
      if (this.testType === 'banchmark') {
        let target = this.typeList[_.random(0, this.typeList.length - 1)]
        let name = `${target[0].toUpperCase() + target.slice(1)}`

        this.$router.push({ name })
        return
      }

      let target = this.testType
      let name = `Play${target[0].toUpperCase() + target.slice(1)}`
      console.log(name)
      this.$router.push({ name })
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;

  .play {
    width: 100%;

    .play-area {
      width: 50%;
      height: 100%;

      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: space-evenly;

      .title,
      .description,
      .icon {
        color: #ffffff;
      }

      .icon {
        flex: 0 0 50px;

        display: flex;
        align-items: center;
        justify-content: center;

        .my-icon {
          font-size: 60px;
        }
      }

      .title {
        flex: 0 0 100px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-family: 'SANGJUGyeongcheonIsland';
        font-size: 70px;
      }

      .description {
        flex: 0 0 50px;

        font-family: 'Nanum Gothic', sans-serif;
        font-size: 18px;
        line-height: 25px;
      }

      .start-btn {
        flex: 0 0 50px;
        width: 100px;
        height: 50px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 7px;
        background-color: #ffff00;
        cursor: pointer;
        font-family: 'SANGJUGyeongcheonIsland';

        &:hover {
          background-color: #ffffff;
        }
      }
    }
  }
  .select-test-area {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding-top: 50px;
    padding-bottom: 50px;

    font-family: 'Nanum Gothic', sans-serif;

    .thumb-wrapper {
      width: 50%;

      display: grid;
      grid-template-columns: repeat(3, minmax(200px, 1fr));
      grid-template-rows: minmax(70px, 1fr);
      justify-items: center;
      align-items: center;
      gap: 30px;
    }
  }
}
</style>