import { BotConfig } from '../../config/BotConfig.js';
import { CommandLoader } from '../../utils/CommandLoader.js';

export class CommandHandler {
  constructor(client) {
    this.client = client;
    this.prefix = BotConfig.prefix;
    this.commands = CommandLoader.loadCommands();
  }

  handleMessage(message) {
    if (!message.content.startsWith(this.prefix)) return;

    const args = message.content.slice(this.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (this.commands.has(commandName)) {
      this.commands.get(commandName).execute(message, args);
    }
  }
}
