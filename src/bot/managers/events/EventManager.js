export class EventManager {
  constructor(client) {
    this.client = client;
  }

  registerEvent(event) {
    if (event.once) {
      this.client.once(event.name, (...args) => event.execute(...args));
    } else {
      this.client.on(event.name, (...args) => event.execute(...args));
    }
  }

  unregisterEvent(eventName) {
    this.client.removeAllListeners(eventName);
  }
}