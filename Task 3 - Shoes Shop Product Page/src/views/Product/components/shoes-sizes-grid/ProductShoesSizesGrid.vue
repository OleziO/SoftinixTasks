<template>
  <div class="flex flex-col gap-8 items-end">
    <div class="w-full flex gap-8">
      <h4>Size:</h4>
      <p>{{ sizeLabel }}</p>
    </div>

    <el-tabs v-model="currSizesType" class="w-full">
      <el-tab-pane
        v-for="tab in sizesTypes"
        :key="tab"
        :label="tab"
        :name="tab"
      >
        <el-radio-group 
          v-model="selectedSize" 
          class="grid grid-cols-5 gap-x-10 gap-y-12 w-full"
        >
          <el-radio-button
            v-for="size in mappedSizes"
            :key="size.size!"
            :label="`${size.size} ${size.suffix}`"
            :value="size.originalSize!"
            :disabled="!size.available"
            class="!w-full"
          />
        </el-radio-group>
      </el-tab-pane>
    </el-tabs>

    <el-button link class="w-fit !text-dark-grey" @click="$emit('openSizesTooltip')">Size guide</el-button>
  </div>
</template>

<script lang="ts" setup>
import { EProductSizesType } from '@/types'

const props = defineProps<{
  product?: TProduct
  selectedColor?: number
}>()

const selectedSize = defineModel<number>({ default: 8.5 })

defineEmits(['openSizesTooltip'])

const sizesTypes = Object.values(EProductSizesType)

const currSizesType = ref<EProductSizesType>(EProductSizesType.UK)

const sizes = computed<TProductShoesSize[]>(() => {
  return props.product?.colors.find(color => color.id === props.selectedColor)?.sizes || []
})

const sizesMap = computed(() => {
  return shoesSizesService.mapSizesByUk(sizes.value)
})

const sizeLabel = computed(() => {
  const size = sizesMap.value[selectedSize.value]

  if (!size) return ''

  return shoesSizesService.generateProductSizeLabel(
    currSizesType.value,
    size[currSizesType.value]
  )
})

const mappedSizes = computed(() => {
  const convertedSizes = shoesSizesService.convertSizes(currSizesType.value, sizesMap.value, sizes.value)

  return currSizesType.value === EProductSizesType.FootLengthCm
    ? convertedSizes.map(item => ({ ...item, suffix: 'cm' }))
    : convertedSizes.map(item => ({ ...item, suffix: '' }))
})

watch(() => props.selectedColor, () => {
  const availableSize = sizes.value.filter(item => item.available)

  const currSize = sizes.value.find(item => item.size === selectedSize.value)

  selectedSize.value = currSize?.available ? currSize.size : availableSize[0]?.size
})

</script>
