/* eslint-disable max-len */
import { ICommandDefinition } from '../interfaces';

export const Command = (command: string, description = ''): MethodDecorator => {
    return (target: any, propertyKey: string | symbol): void => {

        if (!Reflect.hasMetadata('commands', target.constructor)) {
            Reflect.defineMetadata('commands', [], target.constructor);
        }

        const commands = Reflect.getMetadata('commands', target.constructor) as ICommandDefinition[];

        commands.push({
            command,
            description,
            methodName: (propertyKey as string)
        });

        // const sortedCommands = commands.sort((commandA, commandB) => commandB.command.length - commandA.command.length);

        Reflect.defineMetadata('commands', commands, target.constructor);
    };
};