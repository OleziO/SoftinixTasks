<template>
  <el-dialog 
    v-model="model" 
    class="w-full max-w-[360px] md:max-w-[1200px]" 
    :show-close="false"
  >
    <template #header>
      <div class="w-full flex justify-end items-center">
        <el-button link @click="model = false">
          <icon-close />
        </el-button>
      </div>
    </template>
    
    <div class="md:px-[135px]">
      <ProductImagesCarousel 
        :product 
        :selectedColor 
        :with-preview="false"
        :with-mobile-carousel="false"
      />
    </div>
    
  </el-dialog>

</template> 

<script lang="ts" setup>

defineProps<{
  product?: TProduct
  selectedColor?: number
}>()

const model = defineModel<boolean>({default: false})

</script>