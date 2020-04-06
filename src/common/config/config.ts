import _ from 'lodash';

class Config {
    private config: object;

    constructor() {
        this.config = null;
     }

    public async init(serviceName: string, configServerURL?: string): Promise<object> {
        this.config = await Promise.resolve({});
        return this.config;
    }

    public get(path: string, defaultValue?: any): number | string | object {
        return _.get(this.config, path, defaultValue);
    }

    public toObject(): object  {
        return this.config;
    }
}

export default new Config();
