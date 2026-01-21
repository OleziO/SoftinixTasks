<template>
 <div class="w-full rounded-xl bg-info">
    <el-tabs v-model="activeTab" class="p-24 product-details">
      <el-tab-pane
        :label="EProductDetailsTabs.Description"
        :name="EProductDetailsTabs.Description"
        class="border-t"
      >
        <div class="md:max-w-[60%] py-24">
          {{ product?.description }}
        </div>
      </el-tab-pane>

      <el-tab-pane
        v-if="product?.details"
        :label="EProductDetailsTabs.Details"
        :name="EProductDetailsTabs.Details"
        class="border-t border-white-100"
      >
        <div class="py-24">
          <ProductDetailSection :details="product.details"/>
        </div>
      </el-tab-pane>

      <el-tab-pane
        v-if="product?.shipping"
        :label="EProductDetailsTabs.Shopping"
        :name="EProductDetailsTabs.Shopping"
        class="border-t"
      >
        <div class="py-24">
          <ProductDetailSection :details="product.shipping"/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { EProductDetailsTabs } from '@/types'
import ProductDetailSection from './ProductDetailSection.vue';

defineProps<{
  product?: TProduct
}>()

const activeTab = ref(EProductDetailsTabs.Description)

</script>

<style lang="scss">
.product-details.el-tabs {
  .el-tabs__header.is-top {
    @apply mb-0 py-24;
  }

  .el-tabs__nav {
    @apply flex gap-24;

    .el-tabs__item.is-top {
      @apply text-md p-0;
    }
  }
}
</style>
