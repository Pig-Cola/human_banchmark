import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css-reset.css'
import '@/assets/base.css'

import filterSetup from '@/filter'

Vue.config.productionTip = false

Vue.use(filterSetup)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
