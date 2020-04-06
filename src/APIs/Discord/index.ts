import { IServer, ICommandDefinition } from '../../common/interfaces';
import Discord, { Message } from 'discord.js';

export class DiscordServer implements IServer {
    private bot: any;
    private controllers: any[];

    constructor(controllers: any[]) {
        this.bot = null;
        this.controllers = controllers;
    }

    public start(token: string): void {
        this.bot = new Discord.Client();
        this.bot.login(token);

        this.bot.on('ready', () => console.log(`Logged in as ${this.bot.user.tag}!`));

        this.bot.on('message', (message: Message) => { this.dispachAction(message); });
    }

    private dispachAction(message: Message): void {
        let messageContent: string = message.content.trim();
        const controller = this.controllers.find(controller => messageContent.startsWith(controller.prefix));

        if (!controller) {
            return;
        }

        messageContent = messageContent.substring(controller.prefix.length, messageContent.length).trim();
        const command: ICommandDefinition = controller.commands.find((command: any) =>
            messageContent.startsWith(command.command));

        if (!command) {
            return;
        }

        const additionalParameter = messageContent.substring(command.command.length, messageContent.length).trim();

        console.log(`Dispatching ${command.methodName}`)
        controller.instance[command.methodName](message, additionalParameter);
    }
}
