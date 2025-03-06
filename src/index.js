import { Bot } from './bot/Bot.js';
import { Logger } from './utils/helpers/Logger.js';

// Debug logging
Logger.info('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN ? '[PRESENT]' : '[NOT FOUND]'
});

const bot = new Bot();
bot.start().catch(error => {
  Logger.error('Failed to start bot:', error);
  process.exit(1);
});
