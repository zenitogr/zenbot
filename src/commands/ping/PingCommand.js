import { BaseCommand } from '../../interfaces/base/BaseCommand.js';

export class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'Replies with Pong!');
  }

  async execute(message) {
    const sent = await message.reply('Pinging...');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    await sent.edit(`Pong! Latency is ${latency}ms`);
  }
}
