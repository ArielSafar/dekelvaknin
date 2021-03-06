
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { install } from 'source-map-support';
import * as pkg from './package.json';
import { DiscordServer } from './src/APIs/Discord';
import { RESTServer } from './src/APIs/REST';
import config from './src/common/config/config';
import { IServer } from './src/common/interfaces';
import HealthService from './src/common/system/components/health.service';
import { DekelGeneral } from './src/services/dekel/commands/dekel.general';
import { DekelGreedings } from './src/services/dekel/commands/dekel.greetings';
install();

const _sortControllers = (controllers: any[]): any[] =>
    controllers.sort((controllerA, controllerB) => controllerB.prefix.length - controllerA.prefix.length)

const server = async (): Promise<void> => {
    await config.init(pkg.name); // TODO: use @sick/sick-config

    const restServer: IServer = new RESTServer({
        port: 8080,
        middlewares: [
            bodyParser.json({ limit: '10m' })
        ],
        dependencies: {
            config: config,
            healthService: new HealthService()
        }
    });

    restServer.start();
    const dekelCommands = new DekelGeneral();
    const dekelGreedings = new DekelGreedings();

    const controllers = _sortControllers([
        {
            prefix: Reflect.getMetadata('prefix', DekelGeneral),
            commands: Reflect.getMetadata('commands', DekelGeneral),
            instance: dekelCommands
        },
        {
            prefix: Reflect.getMetadata('prefix', DekelGreedings),
            commands: Reflect.getMetadata('commands', DekelGreedings),
            instance: dekelGreedings
        }
    ]);

    const discord = new DiscordServer(controllers);
    discord.start(process.env.BOT_KEY);
}

server();
