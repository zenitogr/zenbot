import { UtilityCog } from '../../cogs/utility/UtilityCog.js';
import { ModerationCog } from '../../cogs/moderation/ModerationCog.js';

export class CogManager {
  constructor(client) {
    this.client = client;
    this.cogs = new Map();
  }

  async loadCogs() {
    // Add new cogs here
    const cogsToLoad = [
      new UtilityCog(),
      new ModerationCog()
    ];

    for (const cog of cogsToLoad) {
      await this.loadCog(cog);
    }
  }

  async loadCog(cog) {
    try {
      // Register commands and events from the cog
      cog.registerCommands(this.client);
      cog.registerEvents(this.client);
      
      // Store the cog
      this.cogs.set(cog.name, cog);
      
      console.log(`Loaded cog: ${cog.name}`);
    } catch (error) {
      console.error(`Error loading cog ${cog.name}:`, error);
    }
  }

  getCog(name) {
    return this.cogs.get(name);
  }

  unloadCog(name) {
    const cog = this.cogs.get(name);
    if (!cog) return false;

    // Remove all commands from this cog
    for (const [commandName] of cog.commands) {
      this.client.commands.delete(commandName);
    }

    // Remove the cog
    this.cogs.delete(name);
    return true;
  }
}