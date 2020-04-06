import express, { Application } from 'express';
import { ExpressOpenAPIArgs, initialize } from 'express-openapi';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { IServer } from '../../common/interfaces';
import apiDoc from './schemes/api-doc';

export class RESTServer implements IServer {
    public app: Application;
    public port: number;
    public dependencies: object;

    constructor(expressServerParams: { port: number; middlewares: any[]; dependencies: any }) {
        this.app = express();
        this.port = expressServerParams.port;
        this.dependencies = expressServerParams.dependencies;

        this.applyMiddlewares(expressServerParams.middlewares);
    }

    private applyMiddlewares(middlewares: any[]): void {
        middlewares.forEach((middleware) => this.app.use(middleware));
    }

    private buildRoutesPaths = (relativePaths: string[]): string[] =>
        relativePaths.map((existsPath: string) => path.join(__dirname, existsPath)).filter(fs.existsSync);

    public start(): void {
        const swaggerSpec = initialize({
            app: this.app,
            apiDoc: apiDoc,
            dependencies: this.dependencies,
            paths: this.buildRoutesPaths(['./routes', '../../common/system/routes']),
            routesGlob: '**/*.{ts,js}',
            routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
        } as ExpressOpenAPIArgs);

        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec.apiDoc));

        this.app.listen(this.port, () => {
            console.log(`REST server successfully started on port ${this.port}`);
        });
    }
}
