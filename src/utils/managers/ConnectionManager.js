import { setTimeout as sleep } from 'node:timers/promises';

export class ConnectionManager {
  static async waitForConnection(client, maxAttempts = 5, retryDelay = 3000) {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        // Check if client is connected
        if (!client.ws.connection) {
          console.log('No WebSocket connection, attempting to reconnect...');
          await client.login(client.token);
        }

        // Wait for the specified delay
        await sleep(retryDelay);

        // Check if we have a valid ping
        if (client.ws.ping > 0) {
          console.log(`Connection established successfully (Ping: ${client.ws.ping}ms)`);
          return true;
        }

        console.log(`Connection attempt ${attempts + 1} failed (Ping: ${client.ws.ping})`);
        attempts++;
      } catch (error) {
        console.error(`Error during connection attempt ${attempts + 1}:`, error);
        attempts++;
      }
    }

    return false;
  }

  static isConnectionHealthy(client) {
    return client.ws.connection && client.ws.ping > 0;
  }
}