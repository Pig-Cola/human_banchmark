<template>
  <div class="aim">
    <play>
      <result v-if="isFinished" @retry="''" testType="aim"></result>
      <div v-else class="play-aim">
        <div class="remnant-target"></div>
        <div class="target-position-area">
          <div class="rows" v-for="(row, i) in gameInfo.targetPosition" :key="`row-${i}`">
            <div
              class="columns"
              v-for="(column, j) in row"
              :key="`column-${j}`"
              :class="{ target: column }"
            >
              <my-icon v-if="column" @mousedown="makeRandomPosition()">target</my-icon>
            </div>
          </div>
        </div>
      </div>
    </play>
  </div>
</template>

<script>
import _ from 'lodash'
import utill from '@/utill'

import MyIcon from '@/components/myIcon'
import Play from '@/components/play'
import Result from '@/components/result'

export default {
  name: 'Aim',
  components: { Result, Play, MyIcon },
  data() {
    return {
      isFinished: false,

      gameInfo: {
        targetCnt: 0,
        targetPosition: [
          [false, true, false],
          [false, false, false],
        ],
      },

      gameData: {
        targetMaxCtn: 30,
        targetPositionDetail: { row: 20, column: 50 },
      },
    }
  },

  mounted() {
    this.reset()
  },

  computed: {
    /**@type {()=>boolean[][]} */
    displayTargetPosition() {
      let targetPosition = this.gameInfo.targetPosition
      return ''
    },
  },

  methods: {
    reset() {
      let { row, column } = this.gameData.targetPositionDetail
      let targetPosition = Array(row * column).fill(false)

      this.gameInfo = {
        targetCnt: 0,
        targetPosition: [],
      }
      this.gameInfo.targetPosition = targetPosition
      this.makeRandomPosition()
    },

    makeRandomPosition() {
      let targetPosition = this.gameInfo.targetPosition

      targetPosition[0] = true
      targetPosition = _(targetPosition).shuffle().value()

      this.gameInfo.targetPosition = targetPosition
    },
  },
}
</script>

<style lang="scss" scoped>
.aim {
  width: 100%;

  .play {
    .play-aim {
      width: 50%;
      height: 100%;

      display: grid;
      grid-template-areas:
        'remnant-target'
        'target-position-area';
      grid-template-rows: minmax(0, 30px) minmax(0, 1fr);
      grid-template-columns: minmax(0, 1fr);

      align-items: center;
      justify-content: center;

      .remnant-target {
        grid-area: remnant-target;
      }
      .target-position-area {
        grid-area: target-position-area;

        width: 100%;
        height: 100%;

        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        justify-content: space-between;
        .rows {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .columns {
            &.target {
              font-size: 70px;
            }
          }
        }
      }
    }
  }
}
</style>