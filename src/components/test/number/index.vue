<template>
  <div class="number">
    <play>
      <result v-if="isFinished" @retry="reset()" testType="number">
        <div class="wrapper">
          <div class="display-number">Number: {{ gameInfo.displayNumber }}</div>

          <div class="my-number">
            <span>Answer: </span>
            <span
              v-for="({ text, isVerified }, i) in verifiedNumber"
              :key="`${i}-${text}-${isVerified}`"
              :class="{ err: !isVerified }"
              >{{ text }}</span
            >
          </div>
          <div class="result-msg">최종 단계: {{ gameInfo.level }}단계</div>
        </div>
      </result>

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
            @keydownEnter="submit()"
            ref="ctInput"
          ></custom-input>

          <div class="submit-btn" @click="submit()">확인</div>
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
      return this.gameInfo.speed + (this.gameInfo.level - 1) * 250
    },

    /**@type {()=>{text:string, isVerified:boolean}[]} */
    verifiedNumber() {
      return this.verification(this.gameInfo.displayNumber, this.gameInfo.myNumber)
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
      this.isFinished = false

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
      if (!this.isNumberString) {
        this.getRef('ctInput').focus()
        return
      }

      let target = this.gameInfo.displayNumber.toString()
      if (target === this.gameInfo.myNumber) {
        this.nextLevel()
        return
      }
      this.isFinished = true
      utill.errSound()
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

    /**@type {(displayNumber: number, myNumber: string)=>{text:string, isVerified:boolean}[]} */
    verification(displayNumber, myNumber) {
      let target = [...displayNumber.toString()]
      let result = [...myNumber]

      return result.map((v, i) => {
        let isVerified = false
        if ((target[i] ?? '') === v) {
          isVerified = true
        }
        return { text: v, isVerified }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.number {
  .result {
    .wrapper {
      width: 100%;
      height: 100%;

      display: grid;
      grid-template-areas:
        'display-number'
        'my-number'
        '.'
        'result-msg'
        '.';
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: repeat(2, minmax(0, 1fr)) minmax(0, 1fr) minmax(0, 3fr) minmax(0, 2fr);
      align-items: center;
      justify-content: center;

      .my-number {
        grid-area: my-number;
        white-space: pre;
        span {
          &.err {
            color: #2d2d2d;
            text-decoration: line-through;
          }
        }
      }
      .display-number {
        grid-area: display-number;
      }
      .result-msg {
        grid-area: result-msg;
      }
      .my-number,
      .display-number,
      .result-msg {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
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

      .submit-btn {
        width: 100px;
        height: 50px;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #ffff00;
        border-radius: 7px;
        font-family: 'BMJUA';
        font-size: 18px;

        cursor: pointer;

        &:hover {
          background-color: #fff;
        }
      }
    }
  }
}
</style>