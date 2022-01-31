import filter from './filter'
import directive from './directive'

/**@type {(Vue:import("vue").VueConstructor)=>void} */
export default function install(Vue) {
  Vue.use(filter)
  // Vue.use(directive)
}
