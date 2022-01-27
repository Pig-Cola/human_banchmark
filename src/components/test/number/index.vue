<template>
  <div class="number">
    <play>
      <result v-if="isFinished"></result>
      <div v-else class="play-number">
        <div v-if="gameInfo.isDisplayed" class="display-area">
          <div class="display-number">{{ gameInfo.displayNumber }}</div>
          <symmentry-progress-bar class="pg-bar" :ms="waitTime"></symmentry-progress-bar>
        </div>

        <div v-else class="answer">
          <custom-input
            class="num-input"
            :class="{ err: !isNumberString }"
            v-model="gameInfo.myNumber"
            @keydownEnter="nextLevel()"
            ref="ctInput"
          ></custom-input>
          <div class="submit-btn">확인</div>
        </div>
      </div>
    </play>
  </div>
</template>

<script>
import _ from 'lodash'
import utill from '@/utill'

import Play from '@/components/play'
import Result from '@/components/result'
import CustomInput from '@/components/customInput'
import SymmentryProgressBar from '@/components/symmetryProgressBar'

export default {
  name: 'Number',
  components: { Result, Play, CustomInput, SymmentryProgressBar },
  data() {
    return {
      isFinished: false,

      gameInfo: {
        speed: 0, // ms
        isDisplayed: false,
        level: 0,
        displayNumber: 0,
        myNumber: '',
      },
    }
  },
  mounted() {
    this.reset()
  },

  computed: {
    /**@type {()=>boolean} */
    isNumberString() {
      let target = /[^0-9]/
      return !target.test(this.gameInfo.myNumber)
    },

    /**@type {()=>number} */
    waitTime() {
      return this.gameInfo.speed + (this.gameInfo.level - 1) * 500
    },
  },

  methods: {
    reset() {
      let [speed, level, displayNumber, myNumber, isDisplayed] = [2000, 0, 0, '', false]

      this.gameInfo = {
        speed,
        isDisplayed,
        level,
        displayNumber,
        myNumber,
      }

      this.nextLevel()
    },

    nextLevel() {
      let level = this.gameInfo.level + 1
      let displayNumber = this.makeRandomInt(level)

      this.gameInfo.level = level
      this.gameInfo.displayNumber = displayNumber
      this.gameInfo.myNumber = ''
      this.display()
    },
    async display() {
      this.gameInfo.isDisplayed = true
      let waitTime = this.waitTime
      await new Promise((res) => {
        setTimeout(() => {
          res()
        }, waitTime)
      })
      this.gameInfo.isDisplayed = false

      await new Promise((res) => {
        setTimeout(() => {
          res()
        }, 10)
      })
      this.getRef('ctInput').focus()
    },
    /**@type {(key: string)=>Vue|Element|HTMLInputElement} */
    getRef(key) {
      return this.$refs[key]
    },
    submit() {
      let target = this.gameInfo.displayNumber.toString()
      target === this.gameInfo.myNumber
    },

    /**@type {(length:number)=>void} */
    makeRandomInt(length) {
      let set = [...'0123456789']
      let first = set[_.random(1, 9)]
      let rest = Array(length - 1)
        .fill(true)
        .map(() => set[_.random(0, 9)])
        .join('')
      return utill.toInt(first + rest)
    },
  },
}
</script>

<style lang="scss" scoped>
.number {
  .play-number {
    width: 50%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    .display-area {
      width: 100%;
      height: 100%;

      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;

      .display-number {
        margin-bottom: 20px;
        font-size: 40px;
        color: #fff;
      }

      .pg-bar {
        width: 100%;
        height: 5px;
        border-radius: 5px;
      }
    }

    .answer {
      width: 100%;
      height: 100%;

      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;

      .num-input {
        width: 100%;
        height: 50px;

        font-size: 20px;
      }
    }
  }
}
</style>