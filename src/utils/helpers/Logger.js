export class Logger {
  static info(message, context = '') {
    console.log(`[INFO][${context}] ${message}`);
  }

  static error(error, context = '') {
    console.error(`[ERROR][${context}] ${error}`);
  }

  static warn(message, context = '') {
    console.warn(`[WARN][${context}] ${message}`);
  }
}