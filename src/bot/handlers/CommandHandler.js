import { BotConfig } from '../../config/BotConfig.js';
import { CommandLoader } from '../../utils/CommandLoader.js';

export class CommandHandler {
  constructor(client) {
    this.client = client;
    this.prefix = BotConfig.prefix;
    this.commands = CommandLoader.loadCommands();
  }

  async handleMessage(message) {
    if (!message.content.startsWith(this.prefix)) return;

    const args = message.content.slice(this.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = this.commands.get(commandName);
    if (command) {
      try {
        await command.execute(message, args);
      } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
        message.reply('There was an error executing that command.').catch(console.error);
      }
    }
  }
}
