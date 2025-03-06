export class EnvConfig {
  static getRequired(key) {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Required environment variable ${key} is not set`);
    }
    return value;
  }

  static get(key, defaultValue = null) {
    return process.env[key] || defaultValue;
  }

  static getBotToken() {
    return this.getRequired('DISCORD_BOT_TOKEN');
  }
}