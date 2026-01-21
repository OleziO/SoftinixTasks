export const productRouteNames = {
  product: 'product'
}

export const productRoutes = [
  {
    path: '/products/:category/:subCategory/:id',
    name: 'Product Detail',
    meta: {
      breadcrumbs: ['category', 'subCategory']
    },
    component: () => import('@/views/Product/Product.vue')
  }
]
