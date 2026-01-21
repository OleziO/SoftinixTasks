<!-- Copied from component 'ElLoading' of element-plus -->
<template>
  <div class="loading-spinner flex" :class="{ '!w-full !h-full items-center justify-center': center }">
    <svg class="circular" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { colors } from '@colors'

const props = withDefaults(defineProps<{
  size?: string
  color?: string
  center?: boolean
  strokeWidth?: number
}>(), {
  size: '18px',
  color: 'primary',
  strokeWidth: 2
})

const getColor = computed(() => (colors[props.color]))
</script>

<style scoped lang="scss">
.loading-spinner, .loading-spinner .circular {
  height: v-bind(size);
  width: v-bind(size);
}

.loading-spinner {
  .circular {
    animation: loading-rotate 2s linear infinite;
  }

  .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: v-bind(strokeWidth);
    stroke: v-bind(getColor);
    stroke-linecap: round;
  }
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
