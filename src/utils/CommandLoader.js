import { PingCommand } from '../commands/ping/PingCommand.js';

export class CommandLoader {
  static loadCommands() {
    const commands = new Map();
    commands.set(PingCommand.name, PingCommand);
    return commands;
  }
}