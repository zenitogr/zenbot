import { ReadyEvent } from '../../events/ready/ReadyEvent.js';

export class EventLoader {
  static loadEvents(eventManager) {
    const events = [
      new ReadyEvent()
    ];

    for (const event of events) {
      eventManager.registerEvent(event);
    }
  }
}