export class MessageCreateEvent {
  constructor(commandHandler) {
    this.name = 'messageCreate';
    this.once = false;
    this.commandHandler = commandHandler;
  }

  execute(message) {
    this.commandHandler.handleMessage(message);
  }
}