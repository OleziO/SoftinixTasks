import { createRouter, createWebHistory } from 'vue-router'
import { routeNames } from './route-names'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: routeNames.rootPage,
      path: '/',
      component: () => import('@/views/SeparatorExamples.vue')
    },
  ]
})
