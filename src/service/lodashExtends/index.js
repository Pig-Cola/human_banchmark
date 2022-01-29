import _ from 'lodash'

import touch from './touch'

export default function () {
  _.mixin({ touch }, { chain: true })
}
