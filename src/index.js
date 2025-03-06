import { Bot } from './bot/Bot.js';
import dotenvx from '@dotenvx/dotenvx';
import { Logger } from './utils/helpers/Logger.js';

// Try to load .env file but don't fail if it doesn't exist
try {
  dotenvx.config({ path: ['.env'], override: false });
} catch (error) {
  Logger.info('No .env file found, using system environment variables');
}

// Add debug logging to help diagnose the issue
Logger.info('Current environment variables:', {
  NODE_ENV: process.env.NODE_ENV,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN ? '[PRESENT]' : '[NOT FOUND]'
});

const bot = new Bot();
bot.start().catch(error => {
  Logger.error('Failed to start bot:', error);
  process.exit(1);
});
