<template>
  <div class="word">
    <play>
      <p>{{ displayWord }}</p>
      <div @click="randomWork()">next</div>
    </play>
  </div>
</template>

<script>
import _ from 'lodash'
import makeWords from './makeWords'

import Play from '@/components/play'

export default {
  name: 'Word',
  components: { Play },

  data() {
    return {
      isFinished: false,
      words: ['', ''],
      gameInfo: {
        myWords: ['', ''],
        displayWord: '',
      },
    }
  },

  mounted() {
    this.init()
  },

  computed: {
    /**@type {()=>string} */
    displayWord() {
      return this.gameInfo.displayWord
    },
    /**@type {()=>boolean} */
    isNotEnoughtLength() {
      return this.gameInfo.myWords.length < 3
    },
  },

  methods: {
    init() {
      this.isFinished = false
      this.words = makeWords()
      this.gameInfo = {
        myWords: [],
        displayWord: '',
      }

      this.randomWork()
      this.displayWord
    },

    randomWork() {
      let displayWord = ''

      if (this.isNotEnoughtLength) {
        displayWord = this.appendWord()
      } else {
        let rand = _.random(0, 1)

        if (rand) {
          displayWord = this.appendWord()
        } else {
          displayWord = this.existedWord()
        }
      }

      this.gameInfo.displayWord = displayWord
    },

    appendWord() {
      let rand = _.random(0, this.words.length - 1)
      let newWord = this.words.splice(rand, 1)
      this.gameInfo.myWords.push(newWord[0])
      return newWord[0]
    },
    existedWord() {
      let rand = _.random(0, this.gameInfo.myWords.length - 1)
      let word = this.gameInfo.myWords[rand]

      return word !== this.displayWord ? word : this.existedWord()
    },
  },

  // computed: {
  //   displayWord() {
  //     return this.gameInfo.displayWord
  //   },
  // },
}
</script>

<style lang="scss" scoped>
</style>