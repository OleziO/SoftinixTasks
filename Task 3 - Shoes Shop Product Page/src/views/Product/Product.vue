<template>
  <div v-loading.fullscreen="loading" class="pb-65 md:pb-0">
    <div v-if="product" class="w-full">
      <div class="w-full flex flex-wrap lg:flex-nowrap gap-24 md:gap-36 lg:gap-48">
        <div class="lg:flex-1 w-full min-w-[330px] relative">
          <ProductImagesCarousel
            class="lg:max-w-[692px]"
            :product
            with-mobile-carousel
            :selected-color="productModel.color"
          />

          <ProductActionButtons 
            :product
            hide-balance
            hide-cart
            class="absolute !w-fit !h-44 right-16 top-16 md:hidden"
          />
        </div>

        <div class="lg:flex-1 flex flex-col">
          <h1 class="cursor-default">{{ product?.name }}</h1>

          <h2 class="mt-8 md:mt-16">${{ price }}</h2>

          <ProductColors
            v-model="productModel.color"
            :product
            class="mt-24 md:mt-36"
          />

          <ProductShoesSizesGrid
            v-model="productModel.size"
            :product
            :selected-color="productModel.color"
            class="mt-24"
            @open-sizes-tooltip="open('ProductShoesSizesInfoModal')"
          />

          <ProductActionButtons :product class="hidden md:flex mt-24"/>
        </div>
      </div>

      <ProductDetails :product class="mt-24 md:mt-48" />
    </div>

    <ProductActionButtons 
      :product
      hide-favorite
      class="flex fixed left-0 bottom-0 z-50 px-16 py-24 bg-white md:hidden"
    />
  </div>
</template>

<script setup lang="ts">
import { routeNames } from '@/router/route-names'

const route = useRoute()
const router = useRouter()

const { open } = useAppModals()

const product = ref<TProduct>()

const productModel = ref<TProductModel>({
  color: undefined,
  size: undefined
})

const price = computed(() => {
  return shoesSizesService.toTwoDecimalsPrice(product.value?.price || 0)
})

const loading = ref(false)


async function init() {
  loading.value = true
  try {
    product.value = await productService.getProductById(Number(route.params.id))

    productModel.value.color = Number(route.query.color) || product.value.colors[0].id
  } catch {
    ElMessage.error(`Failed to fetch product ID:${route.params.id}`)
    router.replace({name: routeNames.rootPage})
  } finally {
    loading.value = false
  }
}

watch(() => route, async () => {
  if(!product.value) await init()
}, {deep: true})

onMounted(init)
</script>
