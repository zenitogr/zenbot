export class CommandOptions {
  constructor(options = {}) {
    this.name = options.name;
    this.description = options.description;
    this.usage = options.usage || '';
    this.aliases = options.aliases || [];
    this.permissions = options.permissions || [];
    this.cooldown = options.cooldown || 0;
  }
}