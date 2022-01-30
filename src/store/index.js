import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: {
      banchmark: '테스트 시작',
      reaction: '반응 속도',
      sequence: '순서 기억하기',
      aim: '표적 누르기',
      number: '숫자 기억하기',
      word: '단어 기억하기',
    },

    description: {
      banchmark: `주어진 테스트를 통해 성능을 확인합니다.
테스트는 랜덤으로 주어지며, 하단에서 선택할 수 있습니다.

지금은 서버와 관련된 기능을 이용하실 수 없습니다.
(대시보드, 회원가입, 로그인, 결과저장 등등)`,
      reaction: `화면의 색이 변할 때 빠르게 반응하세요.
색이 변하기 전에 반응한 것은 반영되지 않습니다.`,
      sequence: `타일이 생성되는 순서를 기억하세요.
순서대로 누르세요.`,
      aim: `30개의 표적을 빠르게 누르세요.`,
      number: `숫자를 기억하세요.
자릿수가 점점 증가합니다.`,
      word: `단어가 등장하면 이미 등장했던 단어인지,
처음 등장하는 단어인지 선택하세요.`,
    },

    icon: {
      banchmark: '',
      reaction: 'power',
      sequence: 'delicious',
      aim: 'target',
      number: 'calculator',
      word: 'font-size',
    },
  },
  getters: {
    info: (state) => (type) => {
      return {
        title: state.title[type],
        description: state.description[type],
        icon: state.icon[type],
      }
    },
    typeList: (state) => {
      let temp = { ...state.title }
      delete temp.banchmark
      return Object.keys(temp)
    },
  },
})
