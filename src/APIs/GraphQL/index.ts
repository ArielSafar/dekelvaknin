import express, { Application } from 'express';
import expressGraphql from 'express-graphql';
import { IServer } from '../../common/interfaces';
import { resolver, scheme } from './scheme/mock.scheme';

export class GraphqlServer implements IServer {
    public app: Application;
    public port: number;

    constructor(expressServerParams: { port: number; middlewares?: Function[] }) {
        this.app = express();
        this.port = expressServerParams.port;

        this.app.use('/', expressGraphql({ schema: scheme, rootValue: resolver, graphiql: true }));
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`GraphQL server successfully started on port ${this.port}`);
        });
    }
}
