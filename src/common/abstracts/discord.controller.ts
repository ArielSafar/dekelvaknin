import { Message, StreamDispatcher, VoiceConnection, MessageEmbed } from "discord.js";
import ytdl from 'ytdl-core';
import { ICommandDefinition } from "../interfaces";
import path from 'path';

export abstract class DiscordController {
    public getPrefixOf(controller: any): string {
        return Reflect.getMetadata('prefix', controller);
    }

    public getCommandsOf(controller: any): ICommandDefinition[] {
        return Reflect.getMetadata('commands', controller);
    }

    public help(message: Message, controller: any, title = 'עזרה'): void {
        const embed = new MessageEmbed().setColor('#006699').setTitle(title);
        const commands = this.getCommandsOf(controller);
        const text = commands.filter(c => c.command).filter(c => !c.command.startsWith('-')).map(command => {
            let commandText = `\`${command.command}\``;

            if (command.description) {
                commandText = `${command.description} - ` + commandText;
            }

            return commandText;

        }).join('\n');
        message.channel.send(embed.setDescription(text));
    }

    public async playYoutubeURL(msg: Message, url: string): Promise<void> {
        let birthdayMusic: StreamDispatcher = null;
        let voiceChannel: VoiceConnection = null;

        try {
            if (!this.isInVoiceChannel(msg)) {
                msg.reply('חייב להתחבר ל-Voice Channel כדי שאנגן משהו');
                return;
            }

            voiceChannel = await msg.member.voice.channel.join();

            birthdayMusic = voiceChannel.play(ytdl(url), { volume: 0.7 });

            birthdayMusic.on('finish', () => {
                voiceChannel.disconnect();
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    public async playLocalFile(msg: Message, relativePath: string): Promise<void> {
        let track: StreamDispatcher = null;
        let voiceConnection: VoiceConnection = null;

        try {
            voiceConnection = await msg.member.voice.channel.join();

            track = voiceConnection.play(path.join(__dirname, relativePath), { volume: 0.5 });

            track.on('finish', () => {
                voiceConnection.channel.leave();
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    public isInVoiceChannel(message: Message): boolean {
        return !!message.member.voice.channel;
    }
}