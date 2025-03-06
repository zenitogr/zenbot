export class ErrorFormatter {
  static format(error) {
    if (!error) return 'Unknown error';

    // If error is a string, return it directly
    if (typeof error === 'string') return error;

    // Format Error object
    const formattedError = {
      message: error.message || 'No error message available',
      stack: error.stack || 'No stack trace available',
      name: error.name || 'Error'
    };

    return `${formattedError.name}: ${formattedError.message}\nStack: ${formattedError.stack}`;
  }
}