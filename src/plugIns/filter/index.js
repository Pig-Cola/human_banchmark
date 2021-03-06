import utill from '@/utill'

/**
 * @param {import('vue').VueConstructor} Vue
 */
export default function install(Vue) {
  Vue.filter('int', utill.toInt)
  Vue.filter('stringReverse', utill.stringReverse)
  Vue.filter('numberComma', utill.numberComma)
}
