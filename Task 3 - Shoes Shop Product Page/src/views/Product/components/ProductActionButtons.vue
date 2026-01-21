<template>
  <div class="w-full flex gap-12">
    <el-badge 
    v-if="!hideCart"
    class="w-full flex-1" 
    type="primary"
    :value="cartItems" 
    :hidden="!cartItems" 
    badge-class="!size-fit !px-[10px] !text-sm"
    :offset="[-10, 0]"
    >
      <el-button 
        class="w-full flex-1" 
        type="success" 
        :loading="cartLoading"
        @click="onAddToCart"
      >
        <template #icon>
          
          <icon-cart />
        
        </template>
          Add to cart
      </el-button>
    </el-badge>

    <el-button 
      v-if="!hideFavorite"
      :type="isFavorite ? 'primary' : 'default'"
      class="!p-0 flex items-center justify-center w-44 h-full" 
      plain 
      :loading="favoriteLoading"
      @click="onAddToFavorite" 
    >
      <template #icon v-if="!favoriteLoading">
        <icon-heart />
      </template>
    </el-button>


    <el-button v-if="!hideBalance" link class="h-full" >
      <icon-balance />
    </el-button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  product?: TProduct
  hideCart?: boolean
  hideFavorite?: boolean
  hideBalance?: boolean
}>()

const cartItems = ref(0)
const isFavorite = ref<boolean>(false)

const favoriteLoading = ref(false)
const cartLoading = ref(false)

async function onAddToFavorite() {
  favoriteLoading.value = true

  try {
    if(!props.product?.id) throw new Error('Product not found')

    isFavorite.value = await productService.changeFavorite(props.product.id, isFavorite.value)

    ElMessage.primary(isFavorite.value ? 'Add to favorite' : 'Remove from favorite')
  } catch {
    ElMessage('Product not found')
  } finally {
    favoriteLoading.value = false
  }
}


async function onAddToCart () {
  cartLoading.value = true

  try {
    if(!props.product?.id) throw new Error('Product not found')

    cartItems.value = await productService.addToCart(cartItems.value)

    ElMessage.primary('Added to cart')
  } catch {
    ElMessage.error('Product not found')
  } finally {
    cartLoading.value = false
  }
}
</script>
