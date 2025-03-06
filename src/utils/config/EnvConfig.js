import { Logger } from '../helpers/Logger.js';

export class EnvConfig {
  static getRequired(key) {
    const value = process.env[key];
    if (!value) {
      Logger.error(`Environment variable ${key} not found. Available variables:`, 
        Object.keys(process.env).join(', '));
      throw new Error(`Required environment variable ${key} is not set`);
    }
    return value;
  }

  static get(key, defaultValue = null) {
    const value = process.env[key];
    if (!value && defaultValue === null) {
      Logger.warn(`Optional environment variable ${key} not found`);
    }
    return value || defaultValue;
  }

  static getBotToken() {
    // Check for different possible environment variable names
    const token = process.env.DISCORD_BOT_TOKEN || 
                 process.env.BOT_TOKEN || 
                 process.env.DISCORD_TOKEN;
    
    if (!token) {
      throw new Error(
        'Discord bot token not found. Please set DISCORD_BOT_TOKEN in your environment variables. ' +
        'For Google Cloud, set this in your app.yaml or through the console.'
      );
    }
    
    return token;
  }
}
