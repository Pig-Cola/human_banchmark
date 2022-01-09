import _ from 'lodash'

/**
 * 정수형으로 만듬(소수 버림)
 * @returns {number} int */
const int = (n) => {
  n = _.toInteger(n)
  return n
}

/**
 * 문자열 뒤집기
 *
 * ex) 'abcde' => 'edcba'
 * @param {string} str
 * @returns {string} string
 */
const stringReverse = (str) => {
  return [...str].reverse().join('')
}

/**
 * ','가 들어간 숫자(문자열)로 만든다.
 *
 * ex) 12345 => '12,345'
 * @returns {string} string
 */
const numberComma = (n) => {
  
  n = _.toString(n)
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

export default {
  int,
  stringReverse,
  numberComma,
}
