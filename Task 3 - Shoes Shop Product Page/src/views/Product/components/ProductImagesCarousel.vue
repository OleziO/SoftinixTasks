<template>
  <div class="w-full relative">
    <el-carousel
      ref="carouselRef"
      v-model:active-index="activeIndex"
      :interval="0"
      arrow="always"
      indicator-position="none"
      class="w-full aspect-square bg-info border-transparent-grey rounded-xl overflow-hidden"
      :class="{'hidden md:flex': !withMobileCarousel}"
      @change="setActiveIndex"
    >
      <el-carousel-item
        v-for="(image, index) in productImages"
        :key="index"
        class="p-40 md:p-70"
        @click="withPreview && open('ProductImagePreview', { product, selectedColor })"
      >
        <el-image
          :src="image"
          fit="contain"
          class="w-full h-full"
        />
      </el-carousel-item>
    </el-carousel>

    <div v-if="!withMobileCarousel" class="w-full flex md:hidden flex-col gap-24">
      <el-image
        v-for="image in productImages"
        :key="image"
        :src="image"
        fit="contain"
        class="w-full h-full"
      />
    </div>

    <div 
      class="w-full lg:grid mt-8 md:mt-12 overflow-auto pb-8 md:pb-12 xl:pb-0 lg:grid-cols-6 flex gap-8 lg:gap-16"
      :class="{'hidden lg:grid': !withMobileCarousel}"
    >
      <div
        v-for="(image, index) in productImages"
        :key="index"
        class="
          aspect-square
          size-full p-12 min-w-65
          bg-info rounded-xl cursor-pointer
          flex items-center justify-center border
          group hover:bg-secondary
        "
        :class="activeIndex === index ? 'border-primary border-[1.5px]' : 'border-transparent-grey'"
        @click="setActiveIndex(index)"
      >
        <el-image
          :src="image"
          fit="contain"
          class="w-full h-full group-hover:scale-110 transition-all duration-300"
        />
      </div>
    </div>

  </div>
</template>


<script setup lang="ts">
import type { ElCarousel } from 'element-plus'
import { ref, computed, watch } from 'vue'

const props = withDefaults(defineProps<{
  product?: TProduct
  selectedColor?: number
  withPreview?: boolean
  withMobileCarousel?: boolean
}>(), {
  withMobileCarousel: true,
  withPreview: true
})

const { open } = useAppModals()

const carouselRef = useTemplateRef<InstanceType<typeof ElCarousel>>('carouselRef')

const activeIndex = ref(0)

const productImages = computed(() =>
  props.product?.colors.find(c => c.id === props.selectedColor)?.images || []
)

function setActiveIndex (index: number) {
  activeIndex.value = index

  carouselRef.value?.setActiveItem(index)
}

watch(() => props.selectedColor, () => {
  setActiveIndex(0)
})
</script>
