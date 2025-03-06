import { Collection } from 'discord.js';
import { RateLimitManager } from '../../../utils/managers/RateLimitManager.js';
import { Logger } from '../../../utils/helpers/Logger.js';

export class CommandManager {
  constructor(client) {
    this.client = client;
    this.commands = new Collection();
    this.rateLimiter = new RateLimitManager();
  }

  registerCommand(command) {
    this.commands.set(command.name, command);
  }

  unregisterCommand(commandName) {
    this.commands.delete(commandName);
  }

  async getCommand(commandName) {
    try {
      await this.rateLimiter.checkRateLimit(commandName);
      return this.commands.get(commandName);
    } catch (error) {
      Logger.warn(`Rate limit reached for command: ${commandName}`, 'CommandManager');
      return null;
    }
  }
}
