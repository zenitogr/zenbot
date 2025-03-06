import { Logger } from '../../utils/helpers/Logger.js';
import { ErrorFormatter } from '../../utils/helpers/ErrorFormatter.js';
import { ConnectionManager } from '../../utils/managers/ConnectionManager.js';

export class ErrorHandler {
  static async handle(error, context, client = null) {
    const formattedError = ErrorFormatter.format(error);
    Logger.error(formattedError, context);

    // Handle connection-related errors
    if (client && error.code === 'ECONNRESET' || error.code === 'DISCONNECTED') {
      console.log('Detected connection error, attempting to reconnect...');
      const reconnected = await ConnectionManager.waitForConnection(client);
      
      if (!reconnected) {
        Logger.error('Failed to reconnect after multiple attempts', context);
      }
    }
  }

  static async handleCommandError(error, message) {
    await message.reply('An error occurred while executing the command.')
      .catch(err => Logger.error('Failed to send error message', err));
      
    this.handle(error, 'Command Execution', message.client);
  }
}
