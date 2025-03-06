import { Client, GatewayIntentBits } from 'discord.js';
import { BotConfig } from '../config/BotConfig.js';
import { CommandManager } from './managers/commands/CommandManager.js';
import { EventManager } from './managers/events/EventManager.js';
import { MessageHandler } from './handlers/MessageHandler.js';
import { CommandLoader } from '../utils/loaders/CommandLoader.js';
import { EventLoader } from '../utils/loaders/EventLoader.js';
import { EnvConfig } from '../utils/config/EnvConfig.js';

export class Bot {
  constructor() {
    this.client = new Client({ 
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
      ],
      failIfNotExists: false,
      presence: {
        status: 'online'
      }
    });
    
    this.commandManager = new CommandManager(this.client);
    this.eventManager = new EventManager(this.client);
    this.messageHandler = new MessageHandler(this.commandManager);
  }

  async start() {
    // Load commands and events
    CommandLoader.loadCommands(this.commandManager);
    EventLoader.loadEvents(this.eventManager);

    // Register message handler
    this.client.on('messageCreate', this.messageHandler.handle);

    // Login using token from environment
    await this.client.login(EnvConfig.getBotToken());
  }
}
