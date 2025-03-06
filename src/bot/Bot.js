import { Client, GatewayIntentBits } from 'discord.js';
import { CommandHandler } from './handlers/CommandHandler.js';

export class Bot {
  constructor() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.commandHandler = new CommandHandler(this.client);
  }

  start() {
    this.setupEventListeners();
    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }

  setupEventListeners() {
    this.client.once('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });

    this.client.on('messageCreate', (message) => {
      this.commandHandler.handleMessage(message);
    });
  }
}