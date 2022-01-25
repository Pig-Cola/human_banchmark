import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import(/* webpackChunkName: "group-main" */ '@/pages/main')
const Test = () => import(/* webpackChunkName: "group-main" */ '@/components/test')
const Wrapper = () => import(/* webpackChunkName: "group-main" */ '@/pages/wrapper')

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
      path: '/test',
      component: Wrapper,
      redirect: { name: 'Main' },
      children: [
        {
          path: 'reaction',
          name: 'Reaction',
          component: Main,
          props: { testType: 'reaction' },
        },
        {
          path: 'sequence',
          name: 'Sequence',
          component: Main,
          props: { testType: 'sequence' },
        },
        // {
        //   path: 'aim',
        //   name: 'Aim',
        //   component: Main,
        //   props: { testType: 'aim' },
        // },
        {
          path: 'number',
          name: 'Number',
          component: Main,
          props: { testType: 'number' },
        },
        {
          path: 'word',
          name: 'Word',
          component: Main,
          props: { testType: 'word' },
        },
      ],
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
        {
          path: 'number',
          name: 'PlayNumber',
          component: Test,
          props: { testType: 'number' },
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
