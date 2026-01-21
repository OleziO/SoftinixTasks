<template>
  <div class="overflow-auto w-full border border-gray-300 rounded-lg">
    <div class="min-w-full">
      <div class="flex bg-gray-100 border-b border-gray-300 sticky top-0 z-10">
        <div
          v-for="column in columns"
          :key="column.id"
          class="flex-1 px-4 py-3 font-semibold text-left text-gray-700 truncate"
        >
          {{ column.label }}
        </div>
      </div>

      <div class="divide-y divide-gray-200">
        <div
          v-for="row in rows"
          :key="row.id"
          class="flex hover:bg-gray-50 transition-colors"
        >
          <div
            v-for="column in columns"
            :key="column.id"
            class="flex-1 px-4 py-3 text-gray-900 truncate"
          >
            <slot :name="column.id">
              {{ getCellValue(row, column.id) }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  columns: IContactColumn[]
  rows: IContactRow[]
}>()

const getCellValue = (row: IContactRow, colId: string): string => {
  const cell = row.cells.find((cell) => cell.colId === colId)
  return cell?.value || ''
}
</script>
