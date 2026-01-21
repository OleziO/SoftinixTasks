<template>
  <div class="flex flex-col gap-10">
    <div v-for="detail in mappedDetails" :key="detail.label" class="flex gap-24">
      <h4 class="w-100 md:w-[200px] truncate capitalize">{{ detail.label }}</h4>
      <span>{{ detail.value }}</span>
    </div>
  </div> 
</template>

<script lang="ts" setup>
const props = defineProps<{
  details: Record<string, string | number>
}>()

const mappedDetails = computed(() =>{
  return Object.entries(props.details).map(([label, value]) => ({
    label,
    value,
  }))
})
</script>
