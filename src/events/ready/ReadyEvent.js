import { BaseEvent } from '../../interfaces/base/BaseEvent.js';
import { ActivityType } from 'discord.js';
import { Logger } from '../../utils/helpers/Logger.js';

export class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready', true);
  }

  async execute(client) {
    try {
      Logger.info(`Logged in as ${client.user.tag}`, 'ReadyEvent');
      
      await client.user.setPresence({
        activities: [{ 
          name: '🟢 Online',
          type: ActivityType.Playing
        }],
        status: 'online'
      });
    } catch (error) {
      Logger.error(`Error in ReadyEvent: ${error.message}`, 'ReadyEvent');
      throw error;
    }
  }
}
