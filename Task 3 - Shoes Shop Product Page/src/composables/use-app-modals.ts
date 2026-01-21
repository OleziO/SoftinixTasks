export function useAppModals () {
  return useModals({
    ProductShoesSizesInfoModal: defineAsyncComponent(() => import('@/views/Product/modals/ProductShoesSizesInfoModal.vue')),
    ProductImagePreview: defineAsyncComponent(() => import('@/views/Product/modals/ProductImagePreview.vue')),
  })
}
