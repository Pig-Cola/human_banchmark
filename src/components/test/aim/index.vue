<template>
  <div class="aim">
    <play>
      <result v-if="isFinished" @retry="''" testType="aim"></result>
      <div v-else class="play-aim"></div>
    </play>
  </div>
</template>

<script>
import _ from 'lodash'
import utill from '@/utill'

import Play from '@/components/play'
import Result from '@/components/result'

export default {
  name: 'Aim',
  components: { Result, Play },
  data() {
    return {
      isFinished: false,
    }
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
    }
  }
}
</style>