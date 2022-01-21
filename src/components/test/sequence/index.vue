<template>
  <div class="sequence">
    <play class="play">
      <result v-if="isFinished" @retry="reset()" :testType="'sequence'">
        <div>{{playInfo.level}}단계</div>
      </result>

      <template v-else>
        <div class="level">{{ playInfo.level }}단계</div>
        <div class="tile-area">
          <div
            v-for="i in 9"
            :key="i"
            :class="['tile', `tile-num-${i}`, { actived: i === activedTile }]"
            @mousedown="clickTile(i)"
          ></div>
        </div>
      </template>
    </play>
  </div>
</template>

<script>
import _ from 'lodash'
import utill from '@/utill'

import Play from '@/components/play'
import Result from '@/components/result'

export default {
  name: 'Sequence',
  components: { Play, Result },

  data() {
    return {
      isFinished: false,

      initData: {
        level: 0,
        speed: 600,

        activedTile: 0,
      },

      playInfo: {
        level: 0,
        speed: 0,
        tile: [0], // number[]

        activedTile: 0,
        verificateTile: [0], // = [...tile]
      },

      sounds: ['g#2', 'a2', 'a#2', 'b2', 'c3', 'c#3', 'd3', 'd#3', 'e3'],
    }
  },

  mounted() {
    this.reset()
  },

  computed: {
    tileCnt() {
      return (this.playInfo.level - 1) / 5 + 1
    },
    activedTile() {
      return this.playInfo.activedTile
    },
  },

  methods: {
    reset() {
      this.playInfo = { ...this.playInfo, ...this.initData }
      this.playInfo.tile = []
      this.isFinished = false

      this.nextLevel()
    },
    nextLevel() {
      this.playInfo.level += 1
      this.addTile()
      this.playTile()
    },
    addTile() {
      this.playInfo.tile.push(_.random(1, 9))
    },

    async playTile() {
      this.playInfo.verificateTile = []
      for (let i of this.playInfo.tile) {
        await this.nextTile(i)
        this.btnSound(i)
        setTimeout(() => {
          this.playInfo.activedTile = 0
        }, 50)
      }
      this.playInfo.verificateTile = [...this.playInfo.tile]
    },
    async nextTile(n) {
      await new Promise((res) => {
        setTimeout(() => {
          this.playInfo.activedTile = n
          res()
        }, this.playInfo.speed)
      })
    },

    clickTile(n) {
      /**@type {number[]} */
      let vTile = this.playInfo.verificateTile

      if (!vTile.length) {
        return
      }

      if (n === vTile.shift()) {
        this.btnSound(n)

        if (!vTile.length) {
          this.nextLevel()
        }
      } else {
        this.errSound()
        this.isFinished = true
      }
    },

    btnSound(n) {
      utill.audio.triggerAttackRelease(this.sounds[n - 1], '60n')
    },
    errSound() {
      utill.errSound()
    },
  },
}
</script>

<style lang="scss" scoped>
.sequence {
  width: 100%;
  height: 100%;

  .play {
    .result-box {
      width: 30%;
      height: 50%;

      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: space-between;

      .score {
        color: #fff;
        font-size: 70px;
        font-family: 'SANGJUGyeongcheonIsland';
      }

      .btns {
        flex: none;
        width: 100%;
        height: 50px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        .again,
        .result {
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

    .tile-area {
      width: 100%;
      height: 100%;

      display: grid;
      grid-template-areas:
        'tile7 tile8 tile9'
        'tile4 tile5 tile6'
        'tile1 tile2 tile3';
      grid-template-rows: repeat(3, minmax(0, 100px));
      grid-template-columns: repeat(3, minmax(0, 100px));
      gap: 10px 10px;
      justify-content: center;

      .tile {
        @for $i from 1 through 9 {
          &-num-#{$i} {
            grid-area: tile#{$i};

            width: 100%;
            height: 100%;

            justify-self: center;

            border-radius: 7px;
            background-color: #00006626;
            transition: background-color 1s ease-out;

            &.actived,
            &:active {
              transition: none;
              background-color: #fff;
            }
          }
        }
      }
    }

    .level {
      color: #fff;
      font-size: 40px;
      font-family: 'Nanum Gothic', sans-serif;

      margin-bottom: 50px;
    }
  }
}
</style>