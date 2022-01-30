import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css-reset.css'
import '@/assets/base.css'
import '@/assets/icon-font/style.css'

import lodashExtends from '@/service/lodashExtends'
import filterSetup from '@/filter'
import MyIcon from '@/components/myIcon'

Vue.config.productionTip = false

lodashExtends()
Vue.use(filterSetup)
Vue.component('my-icon', MyIcon)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
