export class BaseCog {
  constructor(name) {
    this.name = name;
    this.commands = new Map();
    this.events = new Map();
  }
}