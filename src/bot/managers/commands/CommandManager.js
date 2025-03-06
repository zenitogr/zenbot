import { Collection } from 'discord.js';

export class CommandManager {
  constructor(client) {
    this.client = client;
    this.commands = new Collection();
  }

  registerCommand(command) {
    this.commands.set(command.name, command);
  }

  unregisterCommand(commandName) {
    this.commands.delete(commandName);
  }

  getCommand(commandName) {
    return this.commands.get(commandName);
  }
}