import { getRandomCellUpdate } from './contacts-table.fixture'

class ContactsUpdatesService {
  interval: ReturnType<typeof setInterval>

  listenUpdates (callback: (update: ReturnType<typeof getRandomCellUpdate>) => void) {
    this.interval = setInterval(() => {
      callback(getRandomCellUpdate())
    })
  }

  stopListening () {
    clearInterval(this.interval)
  }
}

export const contactsUpdatesService = new ContactsUpdatesService()
