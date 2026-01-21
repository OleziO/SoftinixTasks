import { createRouter, createWebHistory } from 'vue-router'
import { routeNames } from './route-names'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: routeNames.rootPage,
      path: '/',
      component: () => import('@/views/MainPage.vue')
    },
  ]
})
