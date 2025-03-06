import { BaseCommand } from '../../interfaces/base/BaseCommand.js';
import { EmbedBuilder } from 'discord.js';

export class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'Shows bot latency information');
  }

  getLatencyColor(latency) {
    if (latency < 100) return '#00ff00'; // Green
    if (latency < 200) return '#ffff00'; // Yellow
    return '#ff0000'; // Red
  }

  getConnectionStatus(latency) {
    if (latency < 100) return '🟢 Excellent Connection';
    if (latency < 200) return '🟡 Good Connection';
    return '🔴 Poor Connection';
  }

  async execute(message) {
    const initialEmbed = new EmbedBuilder()
      .setTitle('🏓 Measuring Latency...')
      .setDescription('Checking connection status...')
      .setColor('#2b2d31');

    const sent = await message.reply({ embeds: [initialEmbed] });
    const apiLatency = Math.abs(sent.createdTimestamp - message.createdTimestamp);

    const responseEmbed = new EmbedBuilder()
      .setTitle('🏓 Pong!')
      .addFields(
        { 
          name: 'Message Latency', 
          value: `${apiLatency}ms`, 
          inline: true 
        }
      )
      .setColor(this.getLatencyColor(apiLatency))
      .setFooter({ text: 'Bot Status: ' + this.getConnectionStatus(apiLatency) })
      .setTimestamp();

    await sent.edit({ embeds: [responseEmbed] });
  }
}
