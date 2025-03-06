import { BaseEvent } from '../../interfaces/base/BaseEvent.js';

export class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready', true);
  }

  execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
  }
}
