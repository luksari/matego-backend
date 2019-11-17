import { buildSchema } from 'type-graphql';
import { UsersResolver } from './users.resolver';

export const buildUsersSchema = async () => {
  return await buildSchema({
    resolvers: [UsersResolver],
  });
};
