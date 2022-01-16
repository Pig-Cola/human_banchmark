import _ from 'lodash'

/**
 * #### 정수형으로 만듬(소수 버림)
 * @param {number|string} n 숫자 또는 숫자로 구성된 문자열
 * @returns {number} int */
export const toInt = (n) => {
  n = _.toInteger(n)
  return n
}

/**
 * #### 문자열 뒤집기
 * ex) 'abcde' => 'edcba'
 * @param {string} str 뒤집으려는 문자열
 * @returns {string} 뒤집힌 문자열
 */
export const stringReverse = (str) => {
  return [...str].reverse().join('')
}

/**
 * #### ','가 들어간 숫자(문자열)로 만든다.
 * ex) 12345 => '12,345'
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
