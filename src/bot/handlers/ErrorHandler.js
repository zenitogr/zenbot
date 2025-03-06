import { Logger } from '../../utils/helpers/Logger.js';
import { ErrorFormatter } from '../../utils/helpers/ErrorFormatter.js';

export class ErrorHandler {
  static handle(error, context) {
    const formattedError = ErrorFormatter.format(error);
    Logger.error(formattedError, context);
  }

  static async handleCommandError(error, message) {
    await message.reply('An error occurred while executing the command.');
    this.handle(error, 'Command Execution');
  }
}