export class BaseEvent {
  constructor(name, once = false) {
    this.name = name;
    this.once = once;
  }

  execute(...args) {
    throw new Error('Event execute method must be implemented');
  }
}