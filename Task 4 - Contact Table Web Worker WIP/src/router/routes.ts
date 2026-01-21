import type { RouteRecordRaw } from 'vue-router'
import { routeNames } from './route-names'
import { contactsRoutes } from '@/views/contacts/contacts.routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: routeNames.contacts }
  },

  ...contactsRoutes
]

export {
  routes
}
