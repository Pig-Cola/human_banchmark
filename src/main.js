import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css-reset.css'
import '@/assets/base.css'
import '@/assets/icon-font/style.css'

import lodashExtends from '@/service/lodashExtends'
import MyIcon from '@/components/myIcon'
import plugIns from '@/plugIns'

Vue.config.productionTip = false

lodashExtends()
Vue.use(plugIns)
Vue.component('my-icon', MyIcon)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
