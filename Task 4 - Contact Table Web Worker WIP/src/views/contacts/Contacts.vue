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
import { EWorkerMessageType } from '@/views/contacts/workers/contacts.worker.enums'
import type { IWorkerOutboundMessage } from './workers/contacts.worker.types'

const contactsStore = useContactsStore()
const { columns, rows, loading } = storeToRefs(contactsStore)

let worker: Worker | null = null

function handleWorkerMessage (event: MessageEvent<IWorkerOutboundMessage>): void {
  const { type, payload } = event.data

  if (type !== EWorkerMessageType.UPDATES) {
    return
  }

  for (const update of payload) {
    contactsStore.patchRow(update)
  }
}

function initWorker (): void {
  worker = new Worker(
    new URL('@/workers/contacts.worker.ts', import.meta.url),
    { type: 'module' }
  )

  worker.onmessage = handleWorkerMessage
  worker.postMessage({ type: EWorkerMessageType.START })
}

function cleanupWorker (): void {
  if (worker === null) {
    return
  }

  worker.postMessage({ type: EWorkerMessageType.STOP })
  worker.terminate()
  worker = null
}

onBeforeMount(() => {
  contactsStore.initialFetch()
  initWorker()
})

onBeforeUnmount(() => {
  cleanupWorker()
})
</script>
