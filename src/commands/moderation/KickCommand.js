import { BaseCommand } from '../../interfaces/base/BaseCommand.js';
import { PermissionValidator } from '../../utils/validators/PermissionValidator.js';

export class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'Kicks a member from the server');
  }

  async execute(message, args) {
    if (!PermissionValidator.hasPermission(message.member, 'KickMembers')) {
      return message.reply('You do not have permission to use this command!');
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Please mention a member to kick!');
    }

    try {
      await member.kick();
      await message.reply(`Successfully kicked ${member.user.tag}`);
    } catch (error) {
      await message.reply('Failed to kick the member.');
    }
  }
}