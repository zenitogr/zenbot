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
    const start = performance.now(); // More precise latency tracking

    // Send initial response as fast as possible
    const sent = await message.reply('🏓 Pong...');

    // Calculate API latency after reply is sent
    const apiLatency = Math.round(performance.now() - start);

    // WebSocket latency
    let wsLatency = Math.round(message.client.ws.ping);
    if (isNaN(wsLatency)) wsLatency = 'N/A'; // Prevent NaN from showing

    // Modify the existing embed instead of creating new ones
    const updatedEmbed = new EmbedBuilder()
      .setTitle('🏓 Pong!')
      .setDescription('Latency check done!')
      .addFields(
        { name: 'API Latency', value: `${apiLatency}ms`, inline: true },
        { name: 'WebSocket Latency', value: `${wsLatency}ms`, inline: true }
      )
      .setColor(this.getLatencyColor(apiLatency))
      .setFooter({ text: 'Bot Status: ' + this.getConnectionStatus(apiLatency) })
      .setTimestamp();

    // Edit message ASAP
    await sent.edit({ embeds: [updatedEmbed] });
  }
}


