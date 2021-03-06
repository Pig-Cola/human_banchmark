import _ from 'lodash'
import { Synth } from 'tone'

// /**
//  *
//  * types
//  *
//  */

/**
 * @typedef {{
 * title: string,
 * description: string,
 * icon: string,
 * }} types.testInfo
 */

// /**
//  *
//  * sound
//  *
//  */

export const audio = new Synth().toDestination()
audio.volume.value = -2

/**
 * #### 틀리거나 잘못된 조작을 했을 때 소리
 */
export const errSound = () => {
  let now = audio.now()
  audio.triggerAttackRelease('a2', '16n', now)
  audio.triggerAttackRelease('a2', '16n', now + 0.15)
}

// /**
//  *
//  * etc
//  *
//  */

/**
 * #### 개행 문자를 br로 치환
 *
 * @param {string} str
 * @returns {string} \n이 <br>이 됨
 */
export const textLineSpace = (str) => {
  return str.split('\n').join('<br>')
}

/**
 * #### 일정 시간을 기다리는 함수
 *
 * async 함수에서 await으로 호출했을때에 해당한다.
 * 
 * 단, 정확하게 일치한 시점은 아니며 그 이후일 수 있다.
 * @type {(ms:number)=>Promise<void>}
 */
export const waitTime = async (ms) => {
  await new Promise((res) => {
    setTimeout(() => {
      res()
    }, ms)
  })
}

// /**
//  *
//  * for filter
//  *
//  */

/**
 * #### 정수형으로 만듬(소수 버림)
 *
 * @param {number|string} n 숫자 또는 숫자로 구성된 문자열
 * @returns {number} int */
export const toInt = (n) => {
  n = _.toInteger(n)
  return n
}

/**
 * #### 문자열 뒤집기
 *
 * ex) 'abcde' => 'edcba'
 *
 * @param {string} str 뒤집으려는 문자열
 * @returns {string} 뒤집힌 문자열
 */
export const stringReverse = (str) => {
  return [...str].reverse().join('')
}

/**
 * #### ','가 들어간 숫자(문자열)로 만든다.
 *
 * ex) 12345 => '12,345'
 *
 * @param {number|string} n 숫자 또는 숫자로 구성된 문자열
 * @returns {string} string
 */
export const numberComma = (n) => {
  n = _.toString(n)

  if (/[^0-9.]/.test(n)) {
    return ''
  }

  let rest = ''
  let target = n.indexOf('.')
  if (target > -1) {
    rest = n.slice(target)
    n = n.slice(0, target)
  }
  let temp = _([...n].reverse())
    .chunk(3)
    .map((v) => v.join(''))
    .join(',')
  return stringReverse(temp) + rest
}
