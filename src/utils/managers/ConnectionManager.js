import { setTimeout as sleep } from 'node:timers/promises';
import { Logger } from '../helpers/Logger.js';

export class ConnectionManager {
  static async waitForConnection(client, maxAttempts = 5, retryDelay = 5000) {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        Logger.info(`Connection attempt ${attempts + 1}/${maxAttempts}`, 'ConnectionManager');
        
        if (!this.isConnectionHealthy(client)) {
          Logger.warn('WebSocket connection lost, attempting to reconnect...', 'ConnectionManager');
          
          if (client?.login) {
            await client.login(client.token);
            await sleep(1000);
          }
        }

        if (this.isConnectionHealthy(client)) {
          Logger.info(`Connection established (Ping: ${client.ws.ping}ms)`, 'ConnectionManager');
          return true;
        }

        Logger.info(`Waiting ${retryDelay}ms before next attempt...`, 'ConnectionManager');
        await sleep(retryDelay);
        attempts++;
      } catch (error) {
        Logger.error(`Connection attempt ${attempts + 1} failed: ${error.message}`, 'ConnectionManager');
        attempts++;
        
        await sleep(Math.min(1000 * Math.pow(2, attempts), 10000));
      }
    }

    return false;
  }

  static isConnectionHealthy(client) {
    return client?.ws?.connection && 
           client?.ws?.status === 0 && 
           client?.ws?.ping > 0;
  }
}
