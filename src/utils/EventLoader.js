import { ReadyEvent } from '../events/ready/ReadyEvent.js';
import { MessageCreateEvent } from '../events/messageCreate/MessageCreateEvent.js';

export class EventLoader {
  static loadEvents(client, commandHandler) {
    const events = [
      new ReadyEvent(),
      new MessageCreateEvent(commandHandler)
    ];

    for (const event of events) {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
  }
}