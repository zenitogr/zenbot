import { Cog } from '../../interfaces/Cog.js';
import { Command } from '../../interfaces/Command.js';

export class ModerationCog extends Cog {
  constructor() {
    super('moderation');
    
    this.commands.set('kick', new Command(
      'kick',
      'Kicks a member from the server',
      async (message, args) => {
        if (!message.member.permissions.has('KickMembers')) {
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
    ));

    this.events.set('guildMemberAdd', {
      once: false,
      execute: (member) => {
        console.log(`New member joined: ${member.user.tag}`);
      }
    });
  }
}