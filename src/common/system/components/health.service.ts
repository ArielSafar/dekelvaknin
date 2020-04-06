import os from 'os';

export default class HealthService {
    constructor() { }

    public sanityCheck(): object {
        return { status: 'OK' };
    }

    public memoryUsage(): object {
        return {
            total: os.totalmem(),
            free: os.freemem(),
            usage: os.totalmem() - os.freemem(),
            useMemoryPrecentage: Math.round((1 - (os.freemem() / os.totalmem())) * 10000) / 100,
        };
    }

    public livenessProbe() { }

    public readinessProbe() { }
}
