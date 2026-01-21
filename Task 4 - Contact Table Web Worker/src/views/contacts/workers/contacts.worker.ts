import { contactsUpdatesService } from '@/views/contacts/contacts-updates.service'
import { EWorkerMessageType } from './contacts.worker.enums'
import type { IContactUpdate, IWorkerInboundMessage, IWorkerOutboundMessage } from './contacts.worker.types'

const BATCH_INTERVAL_MS = 500
const BATCH_SIZE = 100

const updatesMap = new Map<string, IContactUpdate>()
let batchIntervalId: ReturnType<typeof setInterval> | null = null

function getUpdateKey (update: IContactUpdate): string {
  return `${update.rowId}:${update.colId}`
}

function processBatch () {
  if (!updatesMap.size) return

  const allUpdates = Array.from(updatesMap.values())

  const batch = allUpdates.slice(0, BATCH_SIZE)

  for (const update of batch) {
    updatesMap.delete(getUpdateKey(update))
  }

  const message: IWorkerOutboundMessage = {
    type: EWorkerMessageType.UPDATES,
    payload: batch
  }

  self.postMessage(message)
}

function startListening () {
  if (batchIntervalId) return

  contactsUpdatesService.listenUpdates((update) => {
    updatesMap.set(getUpdateKey(update), update)
  })

  batchIntervalId = setInterval(processBatch, BATCH_INTERVAL_MS)
}

function stopListening () {
  contactsUpdatesService.stopListening()

  if (batchIntervalId) {
    clearInterval(batchIntervalId)

    batchIntervalId = null
  }

  updatesMap.clear()
}

self.onmessage = (event: MessageEvent<IWorkerInboundMessage>) => {
  const { type } = event.data

  switch (type) {
    case EWorkerMessageType.START:
      startListening()
      break
    case EWorkerMessageType.STOP:
      stopListening()
      break
  }
}
