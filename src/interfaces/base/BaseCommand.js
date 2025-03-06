export class BaseCommand {
  constructor(name, description, execute) {
    this.name = name;
    this.description = description;
    this.execute = execute;
  }
}