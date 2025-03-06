import { Bot } from './bot/Bot.js';
import dotenvx from '@dotenvx/dotenvx';

dotenvx.config({path: ['.env']});

//console.log(process.env.DISCORD_BOT_TOKEN);

const bot = new Bot();
bot.start();