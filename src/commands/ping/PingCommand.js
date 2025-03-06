import { BaseCommand } from '../../interfaces/base/BaseCommand.js';
import { EmbedBuilder } from 'discord.js';

export class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'Shows bot latency information');
  }

  async getWebSocketPing(client) {
    // Try up to 3 times to get a valid ping
    for (let i = 0; i < 3; i++) {
      const ping = client?.ws?.ping;
      if (ping && ping > 0 && !isNaN(ping)) {
        return `${Math.round(ping)}ms`;
      }
      // Wait 1 second before next attempt
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return 'Measuring...';
  }

  getConnectionStatus(apiLatency, wsLatency) {
    if (wsLatency === 'Measuring...') {
      return '⚪ Establishing Connection';
    }
    
    const wsNum = parseInt(wsLatency);
    const totalLatency = (apiLatency + wsNum) / 2;
    
    if (totalLatency < 100) return '🟢 Excellent Connection';
    if (totalLatency < 200) return '🟡 Good Connection';
    return '🔴 Poor Connection';
  }

  getLatencyColor(latency) {
    if (latency < 100) return '#00ff00'; // Green
    if (latency < 200) return '#ffff00'; // Yellow
    return '#ff0000'; // Red
  }

  async execute(message) {
    const initialEmbed = new EmbedBuilder()
      .setTitle('🏓 Measuring Latency...')
      .setDescription('Checking connection status...')
      .setColor('#2b2d31');

    const sent = await message.reply({ embeds: [initialEmbed] });
    
    const apiLatency = Math.abs(sent.createdTimestamp - message.createdTimestamp);
    const wsLatency = await this.getWebSocketPing(message.client);

    const responseEmbed = new EmbedBuilder()
      .setTitle('🏓 Pong!')
      .addFields(
        { 
          name: 'Message Latency', 
          value: `${apiLatency}ms`, 
          inline: true 
        },
        { 
          name: 'WebSocket Latency', 
          value: wsLatency, 
          inline: true 
        }
      )
      .setColor(this.getLatencyColor(apiLatency))
      .setFooter({ text: 'Bot Status: ' + this.getConnectionStatus(apiLatency, wsLatency) })
      .setTimestamp();

    await sent.edit({ embeds: [responseEmbed] });
  }
}
