<template>
  <div
    v-loading.fullscreen="loading"
    class="flex flex-col items-center p-10 h-full overflow-hidden"
  >
    <h2 class="text-xl font-bold mb-5">Contacts Table</h2>

    <ContactsMemoryUsage class="mb-5" />

    <ContactsTable
      v-if="!loading"
      class="flex-1"
      :columns
      :rows
    >
      <template #loader>
        <AppLoader />
      </template>
    </ContactsTable>
  </div>
</template>

<script lang="ts" setup>
const contactsStore = useContactsStore()
const { columns, rows, loading } = storeToRefs(contactsStore)

onBeforeMount(() => {
  contactsStore.initialFetch()

  // Uncomment this to see updates in the table
  // contactsUpdatesService.listenUpdates((update) => {
  //   contactsStore.patchRow(update)
  // })
})

onBeforeUnmount(() => {
  contactsUpdatesService.stopListening()
})
</script>
