import { buildSchema } from 'graphql';

export const scheme = buildSchema(`
type Query {
  hello: String
}`);

export const resolver = {
    hello: (): string => 'Hello, World!',
};
