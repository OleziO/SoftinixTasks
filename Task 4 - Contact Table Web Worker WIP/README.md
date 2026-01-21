# Contacts Table - Web Worker Performance Optimization Task

## Project Overview

This project contains a contacts table application that displays and updates contact information in real-time. The table receives frequent updates from a service that mimics server-sent events (SSE) behavior. Currently, the high frequency of update events causes browser memory overload and performance degradation when updates are processed directly in the main thread.

The application includes a `ContactsMemoryUsage.vue` component that monitors browser memory in real-time and displays warnings when memory usage exceeds 80MB.

## Problem Statement

The `contacts-updates.service.ts` generates frequent update events for table cells (identified by `rowId`, `colId`, and new `value`). When the application subscribes to these events directly in the `Contacts.vue` component (see commented code), the browser's memory usage spikes and performance degrades significantly due to:

- High frequency of DOM updates (each event triggers a separate reactive update)
- Main thread blocking
- Memory pressure from rapid object allocations

## Task Goal

Implement a **Web Worker** solution that:
1. Moves the event listening logic off the main thread
2. Maintains a queue of incoming updates
3. Processes the queue every 500ms and sends a strict batch size to the main thread
4. Maintains the existing data management architecture

## Functional Requirements

### FR-1
- Create a Web Worker (`contacts.worker.ts`) that handles update event subscriptions
- The worker **MUST** import and use the existing `contactsUpdatesService.listenUpdates()` method to subscribe to events
- The worker should **NOT** reimplement the service's internal logic (e.g., don't directly call `getRandomCellUpdate` or create your own update generation logic)

### FR-2
- The worker must maintain a **queue** that accumulates all incoming update events
- Every 500ms (strict interval), the worker must process the queue
- **Batch Size**: Define a strict batch size (e.g., 100 updates per batch)
- **Sending Logic**:
  - If the queue has **≥ batch size** items: send exactly **batch size** items, keep the rest in queue
  - If the queue has **< batch size** items: send all available items
  - If the queue is empty: don't send anything
- After sending a batch, remove only the sent items from the queue
- The remaining items stay in the queue for the next interval

### FR-3
- Implement a clear message protocol between main thread and worker:
  - **START**: Begin listening to updates and batching
  - **STOP**: Stop listening and clean up resources
  - **UPDATES**: Message type for sending batched updates to main thread

### FR-4
- Use the existing `contactsStore.patchRow()` method to apply each update
- No modifications to store logic or data structures

## Non-Functional Requirements

### NFR-1
- **Memory Usage**: Solution must keep memory consumption below 80MB threshold
  - The `ContactsMemoryUsage.vue` component monitors memory usage and displays spikes above 80MB
  - A successful implementation should show NO memory spikes (memory stays under 80MB)
- **Responsiveness**: Main thread should remain responsive during heavy update loads

### NFR-2
- Worker must properly clean up all intervals and listeners on STOP
- No memory leaks from unclosed intervals or event listeners
- Worker must be properly terminated when component unmounts

### NFR-3
- No modifications to existing services:
  - `contacts-updates.service.ts` must remain unchanged
  - `contacts.store.ts` logic must remain unchanged
  - `contacts-table.fixture.ts` must remain unchanged

### NFR-4
- Clear separation of concerns between worker and main thread
- Well-defined message protocol
- Readable code

### NFR-5
- Complete the task, commit it to your personal GitHub repository, and deploy it to any Vue.js sandbox of your choice for easier review and validation.

## Constraints
1. **DO NOT** modify `contacts-updates.service.ts`
2. **DO NOT** modify the store's data fetching or storage logic
3. **DO NOT** modify the table rendering components
4. **DO** use the existing `contactsUpdatesService.listenUpdates()` and `contactsUpdatesService.stopListening()` methods
5. **DO** maintain the existing update data structure: `{ rowId: string, colId: string, value: string }`

