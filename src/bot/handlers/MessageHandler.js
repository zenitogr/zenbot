import { BotConfig } from '../../config/BotConfig.js';
import { MessageValidator } from '../../utils/validators/MessageValidator.js';
import { ErrorHandler } from './ErrorHandler.js';

export class MessageHandler {
  constructor(commandManager) {
    this.commandManager = commandManager;
    this.prefix = BotConfig.prefix;
    this.handle = this.handle.bind(this);
  }

  async handle(message) {
    if (!MessageValidator.isValidCommand(message, this.prefix)) return;

    const { commandName, args } = MessageValidator.parseCommand(message, this.prefix);
    const command = await this.commandManager.getCommand(commandName);
    
    if (!command) {
      console.log(`Command not found: ${commandName}`);
      return;
    }

    try {
      await command.execute(message, args);
    } catch (error) {
      await ErrorHandler.handleCommandError(error, message);
    }
  }
}
