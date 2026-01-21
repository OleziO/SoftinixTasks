export interface IContactUpdate {
  rowId: string
  colId: string
  value: string
}

export interface IWorkerInboundMessage {
  type: import('./contacts.worker.enums').EWorkerMessageType
}

export interface IWorkerOutboundMessage {
  type: import('./contacts.worker.enums').EWorkerMessageType
  payload: IContactUpdate[]
}
