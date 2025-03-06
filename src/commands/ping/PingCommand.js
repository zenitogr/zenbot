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
    
    // Calculate both API and WebSocket latency
    const apiLatency = Math.abs(sent.createdTimestamp - message.createdTimestamp);
    const wsLatency = Math.round(message.client.ws.ping);

    // Use the worse latency for color and status
    const worstLatency = Math.max(apiLatency, wsLatency);

    const responseEmbed = new EmbedBuilder()
      .setTitle('🏓 Pong!')
      .addFields(
        { 
          name: 'API Latency', 
          value: `${apiLatency}ms`, 
          inline: true 
        },
        {
          name: 'WebSocket Latency',
          value: `${wsLatency}ms`,
          inline: true
        }
      )
      .setColor(this.getLatencyColor(worstLatency))
      .setFooter({ text: 'Bot Status: ' + this.getConnectionStatus(worstLatency) })
      .setTimestamp();

    await sent.edit({ embeds: [responseEmbed] });
  }
}


