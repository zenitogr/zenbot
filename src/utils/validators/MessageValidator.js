export class MessageValidator {
  static isValidCommand(message, prefix) {
    return message.content.startsWith(prefix) && !message.author.bot;
  }

  static parseCommand(message, prefix) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    return { commandName, args };
  }
}