export class CommandHandler {
  constructor(client) {
    this.client = client;
    this.prefix = '!';
    this.commands = new Map();
    this.registerCommands();
  }

  registerCommands() {
    this.commands.set('ping', (message) => {
      message.reply('Pong!');
    });
  }

  handleMessage(message) {
    if (!message.content.startsWith(this.prefix)) return;

    const args = message.content.slice(this.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (this.commands.has(command)) {
      this.commands.get(command)(message, args);
    }
  }
}