import { Cog } from '../../interfaces/Cog.js';
import { Command } from '../../interfaces/Command.js';

export class UtilityCog extends Cog {
  constructor() {
    super('utility');
    
    // Register commands
    this.commands.set('ping', new Command(
      'ping',
      'Replies with Pong!',
      async (message) => {
        const sent = await message.reply('Pinging...');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        await sent.edit(`Pong! Latency is ${latency}ms`);
      }
    ));

    // Register events if needed
    this.events.set('ready', {
      once: true,
      execute: (client) => {
        console.log(`Utility Cog loaded for ${client.user.tag}`);
      }
    });
  }
}