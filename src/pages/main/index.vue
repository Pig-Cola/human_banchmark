<template>
  <div class="main">
    <play class="play">
      <div class="icon">{{ testIcon }}</div>
      <div class="title">{{ testTitle }}</div>
      <div v-html="testDescription" class="description"></div>
      <div class="start-btn" @click="startClick()">시작</div>
    </play>
  </div>
</template>

<script>
import _ from 'lodash'
import Play from '@/components/play'
import description from './description'

export default {
  name: 'Main',
  components: { Play },
  props: {
    testType: {
      type: String,
      default: 'banchmark',
    },
  },

  data() {
    return {
      testTypeMap: {
        banchmark: {
          title: '성능 테스트',
          description: description.banchmark,
          icon: '',
        },
        reaction: {
          title: '반응 속도',
          description: description.reaction,
          icon: '',
        },
        sequence: {
          title: '순서 기억',
          description: description.sequence,
          icon: '',
        },
        aim: {
          title: '표적 누르기',
          description: description.aim,
          icon: '',
        },
        number: {
          title: '숫자 기억하기',
          description: description.number,
          icon: '',
        },
        word: {
          title: '단어 기억하기',
          description: description.word,
          icon: '',
        },
      },
    }
  },

  computed: {
    testInfo() {
      return this.testTypeMap[this.testType]
    },
    testTitle() {
      return this.testInfo.title
    },
    testDescription() {
      return this.testInfo.description.split('\n').join('<br>')
    },
    testIcon() {
      return this.testInfo.icon
    },
  },

  methods: {
    startClick() {
      if (this.testType === 'banchmark') {
        let temp = { ...description }
        delete temp.banchmark

        let testTypeArray = Object.keys(temp)
        let target = testTypeArray[_.random(0, testTypeArray.length - 1)]
        let name = `${target[0].toUpperCase() + target.slice(1)}`

        this.$router.push({ name })
        return
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'SANGJUGyeongcheonIsland';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/SANGJUGyeongcheonIsland.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);

.main {
  width: 100%;

  .play {
    width: 100%;

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
</style>