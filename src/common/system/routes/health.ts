import { IController } from '../../interfaces';

export class HealthController implements IController {
    private healthService: any;

    constructor(healthService: any) {
        this.healthService = healthService;

        this.get = this.get.bind(this);
    }

    public get(req: any, res: any, next: any): void {
        res.send(this.healthService.memoryUsage());
    }
}

module.exports = (healthService: any): object => {
    const healthController: IController = new HealthController(healthService);

    healthController.get.apiDoc = {
        summary: 'Get health',
        description: 'Return the current status of the service',
        tags: ['system'],
        operationId: 'getHealth',
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

    return { ...healthController };
};
