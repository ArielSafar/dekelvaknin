import { Message, Client } from "discord.js";
import { DiscordController } from "../../../common/abstracts/discord.controller";
import { Command } from "../../../common/decorators/command";
import { Controller } from "../../../common/decorators/controller";

@Controller('דקל')
export class DekelGeneral extends DiscordController {

    @Command('קידומת')
    public prefix(msg: Message): void {
        msg.reply(`הקידומת שלי היא ${this.getPrefixOf(DekelGeneral)}`);
    }

    @Command('נמנם!')
    public nap(msg: Message, bot: Client): void {
        bot.user.setAFK(true);
        bot.user.setActivity('מנמנם');
        bot.user.setStatus('dnd')
    }

    @Command('קום!')
    public wakeup(msg: Message, bot: Client): void {
        bot.user.setAFK(false);
        bot.user.setActivity('היום יום גשום!');
        bot.user.setStatus('online')
    }

    @Command('פינג')
    public ping(msg: Message): void {
        msg.reply('זה סוף עונה!');
    }

    @Command('היום יום')
    public todayIs(msg: Message): void {
        msg.reply('יום גשום')
    }

    @Command('סרטון')
    public sendDekelVid(msg: Message): void {
        msg.channel.send('https://www.youtube.com/watch?v=8_fAWfXY5tk');
    }

    @Command('סרטן')
    public sartan(msg: Message): void {
        this.playYoutubeURL(msg, 'https://www.youtube.com/watch?v=cttDM101EJo');
    }

    @Command('לילה בסיני')
    public dekelSinai(msg: Message): void {
        this.playYoutubeURL(msg, 'https://www.youtube.com/watch?v=cQ8zZ_8qmTw');
    }

    @Command('פסח')
    public passover(msg: Message): void {
        this.playYoutubeURL(msg, 'https://www.youtube.com/watch?v=8bol8SueZEE');
    }

    @Command('אצבע')
    public finger(msg: Message): void {
        msg.reply('https://www.youtube.com/watch?v=7e96htHNCjM');
    }

    @Command('יומולדת')
    public birthday(msg: Message): void {
        this.playLocalFile(msg, '../../../../assets/Birthday.mp3');
    }

    @Command('זדיין')
    public fuckoff(msg: Message): void {
        msg.member.voice.channel.leave();
    }

    @Command('סטן')
    public stan(msg: Message): void {
        this.playYoutubeURL(msg, 'https://www.youtube.com/watch?v=cyzWT6L5xl8&feature=youtu.be');
    }

    @Command('סטן 2')
    public stan2(msg: Message): void {
        this.playYoutubeURL(msg, 'https://www.youtube.com/watch?v=G9SWqYxNuUY');
    }

    @Command('בונטרילו')
    public vantrilo(msg: Message): void {
        this.playYoutubeURL(msg, 'https://www.youtube.com/watch?v=Reh7ei-eawo');
    }

    @Command('ברכה', 'ניתן לכתוב `דקל ברכה עזרה` למידע נוסף')
    public blessDummy(msg: Message): void {
        return;
    }

    @Command('')
    @Command('-ע')
    @Command('--עזרה')
    public helpMenu(message: Message): void {
        this.help(message, DekelGeneral);
    }
}

