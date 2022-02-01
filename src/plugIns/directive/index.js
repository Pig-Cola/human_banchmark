/**@type {(Vue:import("vue").VueConstructor)=>void} */
export default function install(Vue) {
  Vue.directive('touch', {
    /**@type {import("vue").DirectiveFunction} */
    bind(el, binding) {
      if ((binding.modifiers || {}).start) {
        el.addEventListener('touchstart', (e) => {
          e.preventDefault()
          el.dispatchEvent(new Event('mousedown'))
        })
      }

      if ((binding.modifiers || {}).end) {
        el.addEventListener('touchend', (e) => {
          e.preventDefault()
          el.dispatchEvent(new Event('mouseup'))
        })
      }
    },
  })
}
