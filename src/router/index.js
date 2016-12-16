import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { createListView } from '../views/CreateItemList';

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/svg/mobile',
      component: createListView('mobile')
    },
    {
      path: '/svg/life',
      component: createListView('life')
    },
    {
      path: '/svg/game',
      component: createListView('game')
    },
    {
      path: '/svg',
      redirect: '/svg/mobile'
    }
  ]
})
