import { OpenAPIV3 } from 'openapi-types';
import * as pkg from '../../../../package.json';

const apiDoc: OpenAPIV3.Document = {
    openapi: '3.0.0',
    info: {
        title: pkg.name,
        description: pkg.description,
        version: pkg.version,
    },
    paths: {},
    components: {
        requestBodies: {},
        responses: {},
        headers: {},
        examples: {},
        schemas: {},
        securitySchemes: {},
    },
};

export default apiDoc;
