<template>
  <div class="w-[400px] max-h-[200px] overflow-auto flex flex-col items-center">
    <p v-if="mbUsed" class="text-gray-500 mb-2">
      Memory usage: {{ mbUsed }} MB
    </p>

    <div v-if="memorySpikes.length" class="flex flex-col items-center">
      Memory usage spikes:

      <p class="text-red-500">{{ memorySpikes.map(spike => `${spike} MB`).join(', ') }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { memory } = useMemory()

const MEMORY_USAGE_SPIKE_THRESHOLD = 80
const memorySpikes = ref([])

const mbUsed = computed(() => {
  return Math.round(memory.value?.usedJSHeapSize / 1024 / 1024)
})

watch(mbUsed, (newVal) => {
  if (newVal > MEMORY_USAGE_SPIKE_THRESHOLD) {
    memorySpikes.value.push(newVal)
  }
}, { immediate: true })
</script>
