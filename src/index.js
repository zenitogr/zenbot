import { Bot } from './bot/Bot.js';
import dotenvx from '@dotenvx/dotenvx';

dotenvx.config({path: ['.env']});

const bot = new Bot();
bot.start();
