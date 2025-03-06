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

    const initialEmbed = {
      color: '#2b2d31',
      title: '🏓 Measuring Latency...',
      description: 'Checking connection status...',
      fields: [
        {
          name: 'API Latency',
          value: `Measuring ms...`,
          inline: true
        },
        {
          name: 'WebSocket Latency',
          value: `Getiing ms...`,
          inline: true
        }
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'Bot Status: Loading...' }
    };

    const sent = await message.reply({ embeds: [initialEmbed] });
    
    const apiLatency = Math.abs(sent.createdTimestamp - message.createdTimestamp);

    const responseEmbedApiLatency = new EmbedBuilder()
      .setTitle('🏓 Pong!')
      .setDescription('API Latency checked!!!')
      .addFields(
        {
          name: 'API Latency',
          value: `${apiLatency}ms`,
          inline: true
        },
        {
          name: 'WebSocket Latency',
          value: `wait for it...`,
          inline: true
        }
      )
      .setColor(this.getLatencyColor(apiLatency))
      .setFooter({ text: 'Bot Status: ' + this.getConnectionStatus(apiLatency) })
      .setTimestamp();

    await sent.edit({ embeds: [responseEmbedApiLatency] });

    const wsLatency = Math.round(message.client.ws.ping);

    const responseEmbedWs = new EmbedBuilder()
      .setTitle('🏓 Pong!')
      .setDescription('Latency check done!!!')
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
      .setColor(this.getLatencyColor(apiLatency))
      .setFooter({ text: 'Bot Status: ' + this.getConnectionStatus(apiLatency) })
      .setTimestamp();

    await sent.edit({ embeds: [responseEmbedWs] });
  }
}


