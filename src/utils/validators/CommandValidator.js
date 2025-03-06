export class CommandValidator {
  static validateCommand(command) {
    if (!command.name) throw new Error('Command must have a name');
    if (!command.description) throw new Error('Command must have a description');
    if (typeof command.execute !== 'function') throw new Error('Command must have an execute function');
  }
}