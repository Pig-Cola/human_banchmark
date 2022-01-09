<template>
  <div class="main">
    <test v-if="isPlayed" :testType="testType"></test>
    <play v-else class="play">
      <div class="play-area">
        <div class="icon">{{ testIcon }}</div>
        <div class="title">{{ testTitle }}</div>
        <div v-html="testDescription" class="description"></div>
        <div class="start-btn" @click="startClick()">시작</div>
      </div>
    </play>
  </div>
</template>

<script>
import _ from 'lodash'
import Play from '@/components/play'
import Test from '@/components/test'

export default {
  name: 'Main',
  components: { Play, Test },
  props: {
    testType: {
      type: String,
      default: 'banchmark',
    },
  },

  data() {
    return {
      play: false,
    }
  },

  computed: {
    testInfo() {
      return this.$store.getters.info(this.testType)
    },
    typeList() {
      return this.$store.getters.typeList
    },

    testIcon() {
      return this.testInfo.icon
    },
    testTitle() {
      return this.testInfo.title
    },
    testDescription() {
      return this.testInfo.description
    },

    isPlayed() {
      return this.testType !== 'banchmark' && this.play
    },
  },

  methods: {
    startClick() {
      if (this.testType === 'banchmark') {
        let target = this.typeList[_.random(0, this.typeList.length - 1)]
        let name = `${target[0].toUpperCase() + target.slice(1)}`

        this.play = false
        this.$router.push({ name })
        return
      }

      this.play = true
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

        display: flex;
        align-items: center;
        justify-content: center;

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
}
</style>