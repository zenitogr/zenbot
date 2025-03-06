import { BaseEvent } from '../../interfaces/base/BaseEvent.js';
import { ActivityType } from 'discord.js';

export class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready', true);
  }

  async execute(client) {
    try {
      console.log(`Logged in as ${client.user.tag}`);
      
      // Set initial presence
      client.user.setPresence({
        activities: [{ 
          name: 'Starting up...',
          type: ActivityType.Playing
        }],
        status: 'idle'
      });

      // Initial status
      console.log('Initial WebSocket Status:', client.ws.status);
      console.log('Initial WebSocket Ping:', client.ws.ping);

      // Wait for valid ping
      let attempts = 0;
      const maxAttempts = 5;
      const retryDelay = 3000; // 3 seconds between attempts
      
      while (attempts < maxAttempts) {
        try {
          // Check if client is still connected
          if (!client.ws.connection) {
            console.log('WebSocket connection lost, attempting to reconnect...');
            await client.login(process.env.DISCORD_TOKEN);
          }

          await new Promise(resolve => setTimeout(resolve, retryDelay));
          console.log(`Attempt ${attempts + 1}: WebSocket Ping:`, client.ws.ping);
          
          if (client.ws.ping > 0) {
            console.log('WebSocket connection established successfully');
            console.log('Final WebSocket Ping:', client.ws.ping);
            
            // Update presence after successful connection
            client.user.setPresence({
              activities: [{ 
                name: '🟢 Online',
                type: ActivityType.Playing
              }],
              status: 'online'
            });
            
            break;
          }
          
          attempts++;
        } catch (error) {
          console.error(`Connection attempt ${attempts + 1} failed:`, error);
          attempts++;
        }
      }

      if (attempts === maxAttempts) {
        console.warn('Warning: Could not establish stable WebSocket connection after maximum attempts');
        
        // Set presence to indicate connection issues
        client.user.setPresence({
          activities: [{ 
            name: '🔴 Connection Issues',
            type: ActivityType.Playing
          }],
          status: 'dnd'
        });
      }
    } catch (error) {
      console.error('Error in ReadyEvent:', error);
      throw error; // Rethrow to be caught by global error handler
    }
  }
}
