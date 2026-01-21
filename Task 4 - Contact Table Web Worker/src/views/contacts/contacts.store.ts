import { mockColumns, mockRows } from './contacts-table.fixture'

export const useContactsStore = defineStore('contactsStore', () => {
  const rows = ref<IContactRow[]>([])
  const columns = ref<IContactColumn[]>([])
  const loading = ref(false)

  function fetchRows () {
    return new Promise((resolve) => {
      setTimeout(() => {
        rows.value = mockRows
        resolve(rows.value)
      }, 1000)
    })
  }

  function fetchColumns () {
    return new Promise((resolve) => {
      setTimeout(() => {
        columns.value = mockColumns
        resolve(columns.value)
      }, 1000)
    })
  }

  function initialFetch () {
    loading.value = true

    Promise.all([fetchRows(), fetchColumns()])
      .finally(() => {
        loading.value = false
      })
  }

  function patchRow ({ rowId, colId, value }: { rowId: string; colId: string; value: string }) {
    rows.value = rows.value.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          cells: row.cells.map((cell) => {
            if (cell.colId === colId) {
              return { ...cell, value }
            }
            return cell
          })
        }
      }
      return row
    })
  }

  return {
    rows,
    columns,
    loading,
    patchRow,
    initialFetch
  }
})
