<template>
  <div class="number">
    <play>
      <result v-if="isFinished"></result>
      <div v-else class="play-number">
        <div class="display-area">
          <div class="display-number">{{ gameInfo.displayNumber }}</div>
          <div class="time-progress"></div>
        </div>
        <div>
          <custom-input
            class=""
            :class="{ err: !isNumberString }"
            v-model="gameInfo.myNumber"
            @keydownEnter="''"
          ></custom-input>
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

export default {
  name: 'Number',
  components: { Result, Play, CustomInput },
  data() {
    return {
      isFinished: false,

      gameInfo: {
        speed: 0,
        isStarted: false,
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
  },

  methods: {
    reset() {
      let [speed, level, displayNumber, myNumber, isStarted] = [0, 0, 0, '', false]

      this.gameInfo = {
        speed,
        isStarted,
        level,
        displayNumber,
        myNumber,
      }

      this.nextLevel()
    },

    /**@type {()=>void} */
    nextLevel() {
      let level = this.gameInfo.level + 1
      let displayNumber = this.makeRandomInt(level)

      this.gameInfo.level = level
      this.gameInfo.displayNumber = displayNumber
      this.gameInfo.isStarted = true
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
.play-number {
  width: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>