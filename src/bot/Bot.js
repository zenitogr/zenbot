import { Client, GatewayIntentBits } from 'discord.js';
import { BotConfig } from '../config/BotConfig.js';
import { CommandManager } from './managers/commands/CommandManager.js';
import { EventManager } from './managers/events/EventManager.js';
import { MessageHandler } from './handlers/MessageHandler.js';
import { CommandLoader } from '../utils/loaders/CommandLoader.js';
import { EventLoader } from '../utils/loaders/EventLoader.js';

export class Bot {
  constructor() {
    this.client = new Client({ 
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
      ]
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
    this.client.on('messageCreate', this.messageHandler.handle.bind(this.messageHandler));

    // Login
    await this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}
