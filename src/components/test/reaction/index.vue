<template>
  <div class="reaction">
    <play class="play" @mousedown="playClick()" :class="{ r: isRed, g: isGreen }">
      <result v-if="isFinished" @retry="reset()" testType="reaction">
        <div>평균 반응 속도: {{ playInfo.totalScore | int | numberComma }}ms</div>
      </result>
      <div v-else class="msg">
        <template v-if="isStarted">
          <div v-if="isRed">초록색이 되면 누르세요</div>
          <div v-if="isRed">. . .</div>
          <div v-if="isGreen">지금이야..!</div>
        </template>

        <template v-else>
          <template v-if="early">
            <div>너무 일찍 눌렀어요</div>
            <div>...</div>
            <div class="next-play" @click="setupInit()">
              <div>계속하기</div>
            </div>
          </template>

          <template v-else>
            <div>반응 속도</div>
            <div>
              {{ currentPlay.score | int | numberComma }}ms {{ `${playInfo.count}/${maxCount}` }}
            </div>

            <div class="next-play" @click="setupInit()">
              <div>계속하기</div>
            </div>
          </template>
        </template>
      </div>
    </play>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import utill from '@/utill'

import Play from '@/components/play'
import Result from '@/components/result'

export default {
  name: 'Reaction',
  components: { Play, Result },
  data() {
    return {
      maxCount: 5, // 진행 될 테스트 횟수
      isStarted: true,
      early: false,
      isFinished: false,
      setupId: 0, // setTimeOut 취소를 위한 id

      playInfo: {
        totalScore: 0, // ms 평균 반응 속도
        count: 0, // int 몇 회 완료했는지
        scoreList: [],
      },

      currentPlay: {
        startTime: moment(), // moment
        waitTime: 0, // ms
        score: 0, // ms
        isGreen: false,
      },
    }
  },

  mounted() {
    this.reset()
  },

  computed: {
    isGreen() {
      return this.isStarted && this.currentPlay.isGreen && !this.isFinished
    },
    isRed() {
      return this.isStarted && !this.currentPlay.isGreen && !this.isFinished
    },
  },

  methods: {
    reset() {
      this.isStarted = true
      this.early = false
      ;(this.isFinished = false), (this.setupId = 0)

      this.playInfo = {
        totalScore: 0,
        count: 0,
        scoreList: [],
      }
      this.setupInit()
    },
    setupInit() {
      this.currentPlay = {
        ...this.currentPlay,
        waitTime: _.random(2500, 6000),
        score: 0,
        isGreen: false,
      }
      this.isStarted = true

      this.setupId = setTimeout(() => {
        this.toGreen()
      }, this.currentPlay.waitTime)
    },
    toGreen() {
      this.currentPlay = {
        ...this.currentPlay,
        startTime: moment(),
        isGreen: true,
      }
    },

    playClick() {
      if (!this.isStarted) {
        return
      }

      if (this.currentPlay.isGreen) {
        this.success()
      } else {
        this.fail()
      }
    },

    fail() {
      clearTimeout(this.setupId)
      utill.errSound()
      this.isStarted = false
      this.early = true
    },
    success() {
      this.isStarted = false
      this.early = false
      this.playInfo.count += 1

      this.currentPlay.score = moment() - this.currentPlay.startTime
      this.playInfo.scoreList.push(this.currentPlay.score)
      this.playInfo.totalScore = _.sum(this.playInfo.scoreList) / this.playInfo.count

      this.checkFinish()
    },

    checkFinish() {
      if (this.maxCount > this.playInfo.count) {
        return
      }

      this.isFinished = true
    },
  },
}
</script>

<style lang="scss" scoped>
.reaction {
  width: 100%;
  height: 100%;

  .play {
    &.r {
      background-color: #ff0000;
    }
    &.g {
      background-color: #008000;
    }

    .msg {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;

      * {
        color: #fff;
        font-size: 70px;
        font-family: 'Nanum Gothic', sans-serif;
      }

      .next-play,
      .again {
        width: 100px;
        height: 50px;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #ffff00;
        border-radius: 7px;
        cursor: pointer;

        &:hover {
          background-color: #fff;
        }

        div {
          font-size: 16px;
          color: #000;
          font-family: 'SANGJUGyeongcheonIsland';
        }
      }
    }
  }
}
</style>