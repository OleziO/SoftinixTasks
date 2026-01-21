export interface IContactUpdate {
  rowId: string
  colId: string
  value: string
}

export interface IWorkerInboundMessage {
  type: import('./contacts.worker.enums').EWorkerMessageType.START | import('./contacts.worker.enums').EWorkerMessageType.STOP
}

export interface IWorkerOutboundMessage {
  type: import('./contacts.worker.enums').EWorkerMessageType.UPDATES
  payload: IContactUpdate[]
}
