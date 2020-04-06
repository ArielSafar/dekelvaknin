import { IController } from '../../interfaces';

export class ConfigController implements IController {
    private config: any;

    constructor(config: any) {
        this.config = config;
        this.get = this.get.bind(this);
    }

    public get(req: any, res: any, next: any): void {
        res.send(this.config.toObject());
    }
}

module.exports = (config: any): object => {
    const configController: IController = new ConfigController(config);

    configController.get.apiDoc = {
        summary: 'Get config',
        description: 'Get the current config of the service',
        tags: ['system'],
        operationId: 'getConfig',
        responses: {
            200: {
                description: 'The requested apiDoc.',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                        },
                    },
                },
            },
        },
    };

    return { ...configController };
};
