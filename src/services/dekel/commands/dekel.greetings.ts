import { Message } from "discord.js";
import { Controller } from "../../../common/decorators/controller";
import { Command } from "../../../common/decorators/command";
import { DiscordController } from "../../../common/abstracts/discord.controller";

@Controller('דקל ברכה')
export class DekelGreedings extends DiscordController {

    @Command('שפגט')
    public shpagat(messgae: Message): void {
        this.playYoutubeURL(messgae, 'https://www.youtube.com/watch?v=okaxndUk0sA');
    }

    @Command('קורונה')
    public covid19(messgae: Message): void {
        this.playYoutubeURL(messgae, 'https://www.youtube.com/watch?v=ci6v2tQAIsQ');
    }

    @Command('גולאג')
    public gulag(messgae: Message): void {
        this.playYoutubeURL(messgae, 'https://www.youtube.com/watch?v=Um1EH41BXJw');
    }

    @Command('עדי')
    public adi(messgae: Message): void {
        this.playYoutubeURL(messgae, 'https://www.youtube.com/watch?v=VW-y7DJftcA');
    }

    @Command('')
    @Command('-ע')
    @Command('--עזרה')
    public helpMenu(message: Message): void {
        this.help(message, DekelGreedings, 'הברכות של דקל');
    }
}

