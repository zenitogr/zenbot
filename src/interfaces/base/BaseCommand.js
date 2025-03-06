export class BaseCommand {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  async execute(message, args) {
    throw new Error('Command execute method must be implemented');
  }
}
