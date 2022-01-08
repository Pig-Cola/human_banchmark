import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/pages/main'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    /**
     * 지연로딩 (razy-loading)
     * https://router.vuejs.org/kr/guide/advanced/lazy-loading.html
     */
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
    // },
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ],
  mode: 'history',
})
