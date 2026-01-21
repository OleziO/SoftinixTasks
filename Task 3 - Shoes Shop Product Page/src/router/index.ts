import { createRouter, createWebHistory } from 'vue-router'
import { routeNames } from './route-names'
import { productRoutes } from '@/views/Product/product.routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: routeNames.rootPage,
      path: '/',
      redirect: {
        path: '/products/unisex-shoes/unisex-sportStyle-shoes/1',
        query: { color: '1' },
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        path: '/products/unisex-shoes/unisex-sportStyle-shoes/1',
        query: { color: '1' },
      },
    },    
    ...productRoutes
  ]
})
