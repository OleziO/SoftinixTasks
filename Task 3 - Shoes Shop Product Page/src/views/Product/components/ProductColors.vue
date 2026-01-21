<template>
  <div class="w-full flex flex-col gap-8">
    <div class="w-full flex gap-8">
      <h4>Color:</h4>
      <p>{{ productColorData?.name }}</p>
    </div>

    <el-radio-group v-model="selectedColorId" class="grid grid-cols-5 gap-8 md:gap-12"  @change="onColorChange">
      <el-tooltip
        v-for="color in product?.colors"
        :key="color.id"
        :show-arrow="false"
        :offset="-10"
        placement="bottom"
        :content="color.name"
      >
        <el-radio-button
          :value="color.id"
          :disabled="checkIsColorNotAvailable(color)"
          class="!w-full !h-65 md:!h-70 group product-color"
        >
          <el-image
            :src="color.images[0] || ''"
            class="min-w-[50px] p-0 md:p-10"
            :class="checkIsColorNotAvailable(color)
              ? 'opacity-50 cursor-not-allowed'
              : 'group-hover:scale-110 transition-all duration-300'"
          />
        </el-radio-button>
      </el-tooltip>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { routeNames } from '@/router/route-names';

const props = defineProps<{
  product?: TProduct
}>()

const selectedColorId = defineModel<number>()

const router = useRouter()

const productColorData = computed(() => {
  const colors = (props.product?.colors || []).filter(color => !checkIsColorNotAvailable(color))

  const currColor = colors?.find(item => item.id === selectedColorId.value)

  if(!currColor) {
    selectedColorId.value = colors[0].id
    nextTick(() => onColorChange())

    return colors[0]
  } else {
    return currColor;
  }
})

function checkIsColorNotAvailable (color: TColor) {
  return color.sizes.every(item => !item.available)
}

function onColorChange() {
  router.push({ query: { color: selectedColorId.value || 1 } })
}

</script>

<style lang="scss" scoped>
.product-color.el-radio-button {
  &:not(.is-active, .is-disabled) {
    @apply border border-info;
  }

  --el-button-bg-color: theme(colors.transparent-grey);

  &.is-active {
    @apply border-primary border-[1.5px] font-medium;
  }

  &.is-disabled {
    --el-button-bg-color: theme(colors.secondary);

    @apply border border-secondary opacity-50;
  }
}
</style>
