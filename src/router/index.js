import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/pages/main'
import Test from '@/components/test'
import Wrapper from '@/pages/wrapper'

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
      component: Main,
    },
    {
      path: '/test/reaction',
      name: 'Reaction',
      component: Main,
      props: { testType: 'reaction' },
    },
    {
      path: '/test/sequence',
      name: 'Sequence',
      component: Main,
      props: { testType: 'sequence' },
    },
    // {
    //   path: '/test/aim',
    //   name: 'Aim',
    //   component: Main,
    //   props: { testType: 'aim' },
    // },
    // {
    //   path: '/test/number',
    //   name: 'Number',
    //   component: Main,
    //   props: { testType: 'number' },
    // },
    {
      path: '/test/word',
      name: 'Word',
      component: Main,
      props: { testType: 'word' },
    },
    {
      path: '/play',
      component: Wrapper,
      redirect: { name: 'Main' },
      children: [
        {
          path: 'reaction',
          name: 'PlayReaction',
          component: Test,
          props: { testType: 'reaction' },
        },
        {
          path: 'sequence',
          name: 'PlaySequence',
          component: Test,
          props: { testType: 'sequence' },
        },
        {
          path: 'word',
          name: 'PlayWord',
          component: Test,
          props: { testType: 'word' },
        },
      ],
    },
    {
      path: '*',
      redirect: { name: 'Main' },
    },
  ],
  mode: 'history',
})
