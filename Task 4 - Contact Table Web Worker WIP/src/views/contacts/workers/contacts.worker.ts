import { contactsUpdatesService } from '@/views/contacts/contacts-updates.service'
import { EWorkerMessageType } from './contacts.worker.enums'
import type { IContactUpdate, IWorkerInboundMessage, IWorkerOutboundMessage } from './contacts.worker.types'

const BATCH_INTERVAL_MS = 500
const BATCH_SIZE = 100

const updateQueue: IContactUpdate[] = []
let batchIntervalId: ReturnType<typeof setInterval> | null = null

function processBatch (): void {
  if (updateQueue.length === 0) {
    return
  }

  const batchCount = Math.min(updateQueue.length, BATCH_SIZE)
  const batch = updateQueue.splice(0, batchCount)

  const message: IWorkerOutboundMessage = {
    type: EWorkerMessageType.UPDATES,
    payload: batch
  }

  self.postMessage(message)
}

function startListening (): void {
  if (batchIntervalId !== null) {
    return
  }

  contactsUpdatesService.listenUpdates((update) => {
    updateQueue.push(update)
  })

  batchIntervalId = setInterval(processBatch, BATCH_INTERVAL_MS)
}

function stopListening (): void {
  contactsUpdatesService.stopListening()

  if (batchIntervalId !== null) {
    clearInterval(batchIntervalId)
    batchIntervalId = null
  }

  updateQueue.length = 0
}

self.onmessage = (event: MessageEvent<IWorkerInboundMessage>): void => {
  const { type } = event.data

  if (type === EWorkerMessageType.START) {
    startListening()
  } else if (type === EWorkerMessageType.STOP) {
    stopListening()
  }
}
