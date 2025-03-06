import { PingCommand } from '../../commands/ping/PingCommand.js';

export class CommandLoader {
  static loadCommands(commandManager) {
    const commands = [
      new PingCommand()
    ];

    for (const command of commands) {
      if (command && command.name && typeof command.execute === 'function') {
        commandManager.registerCommand(command);
      } else {
        console.error(`Invalid command structure for command: ${command?.name}`);
      }
    }
  }
}
