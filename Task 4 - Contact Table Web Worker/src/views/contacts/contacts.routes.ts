export const contactsRouteNames = {
  contacts: 'contacts'
}

export const contactsRoutes = [
  {
    path: '/contacts',
    name: contactsRouteNames.contacts,
    component: () => import('@/views/contacts/Contacts.vue')
  }
]
