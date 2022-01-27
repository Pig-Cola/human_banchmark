<template>
  <div class="header-wrapper">
    <div class="header">
      <div class="banch" @click="banchClick()">성능 테스트</div>
      <div class="dash">대시보드</div>
      <template v-if="true">
        <div class="sign-up">회원가입</div>
        <div class="sign-in">로그인</div>
      </template>
      <div v-else class="sign-in">로그아웃</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    banchClick() {
      this.$router.push({ name: 'Main' }).catch(() => {})
    },
    dashClick() {},
    signUpClick() {},
    signInClick() {},
  },
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgb(45, 45, 45);

  .header {
    width: 50%;
    height: 50px;

    display: grid;
    grid-template-areas: 'banch dash . sign-up sign-in';
    grid-template-columns: repeat(2, minmax(0, auto)) 1fr repeat(2, minmax(0, auto));
    column-gap: 15px;

    .banch,
    .dash,
    .sign-in,
    .sign-up {
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;

      font-family: 'BMJUA';
      font-size: 20px;
      color: white;
      user-select: none;
      cursor: pointer;
    }

    .banch {
      grid-area: banch;
    }
    .dash {
      grid-area: dash;
    }
    .sign-up {
      grid-area: sign-up;
    }
    .sign-in {
      grid-area: sign-in;
    }
  }
}
</style>