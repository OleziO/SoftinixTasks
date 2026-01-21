<template>
  <div class="flex flex-wrap items-center">
    <template v-for="(item, index) in mappedItems" :key="item.value">
      <span class="flex items-center gap-1">
        <slot name="label" :label="item.label" :item="item">
          <span v-if="item.label" class="font-bold capitalize">{{ item.label }}:</span>
        </slot>

        <slot name="value" :value="item.value" :item="item">
          <span>{{ parseValue(item.value) }}</span>
        </slot>
      </span>

      <slot name="separator" v-if="index !== lastIndex">
        <span class="mx-1.5">
          {{ resolvedSeparator }}
        </span>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

type TPrimitive = string | number | boolean | bigint | symbol | null | undefined | Date

const props = withDefaults(defineProps<{
  items: Record<string, TPrimitive | TPrimitive[]>

  separator?: string

  formatDate?: boolean,
  formatBoolean?: boolean

  hideElements?: string[]
  noLabelElements?: string[]

  customArraySeparator?: string
  customDateFormat?: string
  customBooleanFormat?: {
    trueValue: string
    falseValue: string
  }
}>(), {
  formatDate: true,
  formatBoolean: true,

  customArraySeparator: ', ',
  customDateFormat: 'MM-DD-YYYY',
  customBooleanFormat: () => ({
    trueValue: 'Yes',
    falseValue: 'No'
  })
})

const resolvedSeparator = computed(() => props.separator ?? '·')
const lastIndex = computed(() => mappedItems.value.length - 1)

const mappedItems = computed(() => {
  return Object.entries(props.items)
    .filter(([label]) => props.hideElements?.includes(label))
    .map(([label, value]) => { 
      if(props.noLabelElements?.includes(label)) return {label: '', value}
      
      return { label, value }
    })
})


function parseValue (value: any) { // In real project this should be in helper file without exposing from component
  const isDate =
    dayjs.isDayjs(value) ||
    (value instanceof Date && !isNaN(value.getTime())) ||
    (typeof value === 'string' && /\D/.test(value) && dayjs(value).isValid())

  if (isDate && props.formatDate) {
    return dayjs(value).format(props.customDateFormat)
  }
  
  if (props.formatBoolean) {
    const str = String(value).toLowerCase()

    if (str === 'true' || str === 'false') {
      return str === 'true' ? props.customBooleanFormat?.trueValue : props.customBooleanFormat?.falseValue
    }
  }

  return Array.isArray(value) ? value.join(props.customArraySeparator) : String(value)
}

defineExpose({
  parseValue
})

</script>
