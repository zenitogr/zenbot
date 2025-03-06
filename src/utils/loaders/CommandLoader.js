import { PingCommand } from '../../commands/ping/PingCommand.js';

export class CommandLoader {
  static loadCommands(commandManager) {
    const commands = [
      new PingCommand()
    ];

    for (const command of commands) {
      commandManager.registerCommand(command);
    }
  }
}