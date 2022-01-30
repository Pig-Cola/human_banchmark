<template>
  <div class="aim">
    <play>
      <result v-if="isFinished" @retry="reset()" testType="aim">
        <div class="msg">소요시간 : {{ totalTime }}초</div>
      </result>
      <div v-else class="play-aim">
        <div class="remnant-target">남은 표적 수 : {{ remnantTargetCnt }}개</div>
        <transition-group name="row-group" class="target-position-area" tag="div">
          <transition-group
            name="target-group"
            tag="div"
            class="rows"
            v-for="row in gameInfo.targetPosition"
            :key="row.key"
          >
            <div class="columns" v-for="column in row.value" :key="column.key">
              <my-icon class="target" v-if="column.value" @mousedown="clickTarget()"
                >target</my-icon
              >
            </div>
          </transition-group>
        </transition-group>
      </div>
    </play>
  </div>
</template>

<script>
import _ from 'lodash'
import utill from '@/utill'
import moment from 'moment'

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
        targetPosition: [{ value: [{ value: false, key: '' }], key: '' }],
        time: {
          start: 0,
          end: 0,
        },
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
    utill: () => utill,

    /**@type {()=>number} */
    remnantTargetCnt() {
      return this.gameData.targetMaxCtn - this.gameInfo.targetCnt + 1
    },

    /**@type {()=>number} */
    totalTime() {
      return (this.gameInfo.time.end - this.gameInfo.time.start) / 1000
    },
  },

  methods: {
    reset() {
      this.isFinished = false

      let { row, column } = this.gameData.targetPositionDetail
      let targetPosition = Array(row * column).fill(false)
      targetPosition[0] = true

      targetPosition = _(targetPosition)
        .map((value, i) => ({ value, key: `target-key-${i}` }))
        .chunk(column)
        .map((value, i) => ({ value, key: `row-${i}` }))
        .value()

      this.gameInfo = {
        targetCnt: 0,
        targetPosition: [],
        time: {
          start: +moment(),
          end: 0,
        },
      }

      this.gameInfo.targetPosition = targetPosition
      this.next()
    },

    next() {
      this.gameInfo.targetCnt += 1
      this.randomPosition()
    },
    randomPosition() {
      let targetPosition = this.gameInfo.targetPosition
      targetPosition = _(targetPosition)
        .map(({ value, key }) => ({
          value: _(value).shuffle().value(),
          key,
        }))
        .shuffle()
        .value()

      this.gameInfo.targetPosition = targetPosition
    },

    clickTarget() {
      this.utill.audio.triggerAttackRelease('f4', '32n')
      if (!(this.remnantTargetCnt - 1)) {
        this.isFinished = true
        this.gameInfo.time.end = +moment()
      }
      this.next()
    },
  },
}
</script>

<style lang="scss" scoped>
.row-group-move,
.target-group-move {
  transition: transform 150ms ease-out;
}

.aim {
  width: 100%;

  .play {
    .result {
      .msg {
        font-size: 25px;
      }
    }
    .play-aim {
      width: 50%;
      height: 100%;

      display: grid;
      grid-template-areas:
        'remnant-target'
        'target-position-area';
      grid-template-rows: minmax(0, 30px) minmax(0, 1fr);
      grid-template-columns: minmax(0, 1fr);
      row-gap: 20px;

      align-items: center;
      justify-content: center;

      .remnant-target {
        grid-area: remnant-target;

        display: flex;
        align-items: center;
        justify-content: center;

        color: #fff;
        font-size: 25px;
        font-weight: bold;
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
            .target {
              color: #fff;
              font-size: 100px;
            }
          }
        }
      }
    }
  }
}
</style>