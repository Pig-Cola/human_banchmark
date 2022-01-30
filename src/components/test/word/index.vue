<template>
  <div class="word">
    <play class="play">
      <result v-if="isFinished" @retry="reset()" testType="word">최종 스코어: {{ score }}</result>
      <div v-else class="play-word">
        <div class="lives">목숨: {{ lives }}</div>
        <div class="level">스코어: {{ score }}</div>
        <div class="current-word">{{ displayWord }}</div>
        <div @mousedown="clickExisted()" class="existed-word-btn">이미 등장한 단어</div>
        <div @mousedown="clickNew()" class="new-word-btn">처음 등장한 단어</div>
      </div>
    </play>
  </div>
</template>

<script>
import _ from 'lodash'
import utill from '@/utill'
import makeWords from './makeWords'

import Play from '@/components/play'
import Result from '@/components/result'

export default {
  name: 'Word',
  components: { Play, Result },

  data() {
    return {
      isFinished: false,
      words: ['', ''],
      gameInfo: {
        myWords: ['', ''],
        displayWord: '',
        lives: 0,
        score: 0,
      },
    }
  },

  mounted() {
    this.reset()
  },

  computed: {
    /**@type {()=>boolean} */
    isNotEnoughtLength() {
      return this.gameInfo.myWords.length < 3
    },
    /**@type {()=>boolean} */
    isExistedWord() {
      return this.myWordsMap[this.displayWord] || false
    },

    /**@type {()=>string} */
    displayWord() {
      return this.gameInfo.displayWord
    },
    /**@type {()=>number} */
    lives() {
      return this.gameInfo.lives
    },
    /**@type {()=>number} */
    score() {
      return this.gameInfo.score
    },

    /**@type {()=>{[x:string]: boolean}} */
    myWordsMap() {
      return _(this.gameInfo.myWords)
        .map((v) => [v, true])
        .fromPairs()
        .value()
    },
  },

  methods: {
    reset() {
      this.isFinished = false
      this.words = makeWords()
      this.gameInfo = {
        myWords: [],
        displayWord: '',
        lives: 3,
        score: 1,
      }

      this.randomWork()
    },

    randomWork() {
      let displayWord = ''

      if (this.isNotEnoughtLength) {
        displayWord = this.makeNewWord()
      } else {
        let rand = _.random(0, 1)

        if (rand) {
          displayWord = this.makeNewWord()
        } else {
          displayWord = this.makeExistedWord()
        }
      }

      this.gameInfo.displayWord = displayWord
    },
    makeNewWord() {
      let rand = _.random(0, this.words.length - 1)
      let newWord = this.words.splice(rand, 1)
      return newWord[0]
    },
    /**@type {()=>function|string} */
    makeExistedWord() {
      let rand = _.random(0, this.gameInfo.myWords.length - 1)
      let word = this.gameInfo.myWords[rand]
      return word === this.displayWord ? this.makeExistedWord() : word
    },
    success() {
      this.gameInfo.score += 1
      this.randomWork()
    },
    fail() {
      utill.errSound()
      this.gameInfo.lives -= 1
      if (this.gameInfo.lives < 1) {
        this.isFinished = true
        return
      }
      this.randomWork()
    },

    clickExisted() {
      if (this.isExistedWord) {
        this.success()
      } else {
        this.gameInfo.myWords.push(this.displayWord)
        this.fail()
      }
    },
    clickNew() {
      if (this.isExistedWord) {
        this.fail()
      } else {
        this.gameInfo.myWords.push(this.displayWord)
        this.success()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.word {
  width: 100%;
  height: 100%;

  .play {
    .result-msg {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .play-word {
      width: 50%;
      height: 100%;

      display: grid;
      grid-template-areas:
        'lives level'
        'current-word current-word'
        'existed-word-btn new-word-btn'
        '. .';
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: minmax(0, 1fr) minmax(0, 3fr) minmax(0, 1fr) minmax(0, 1fr);
      align-items: center;
      justify-items: center;
      column-gap: 40px;

      color: #fff;

      .current-word {
        grid-area: current-word;

        font-size: 70px;
      }
      .existed-word-btn {
        grid-area: existed-word-btn;
        justify-self: end;
      }
      .new-word-btn {
        grid-area: new-word-btn;
        justify-self: start;
      }
      .existed-word-btn,
      .new-word-btn {
        cursor: pointer;
        transition: background-color 400ms;

        &:hover {
          background-color: #fff;
        }
      }
      .lives {
        grid-area: lives;
        justify-self: end;
      }
      .level {
        grid-area: level;
        justify-self: start;
      }

      .existed-word-btn,
      .new-word-btn {
        width: 150px;
        height: 50px;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #ffff00;
        border-radius: 7px;
        color: #000;
        font-weight: bold;
      }
    }
  }
}
</style>
