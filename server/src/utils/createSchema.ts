import { GraphQLSchema } from "graphql";
import { gameResolver } from "../resolvers/game";
import { buildSchema } from "type-graphql";
import { userResolver } from "../resolvers/user";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [userResolver, gameResolver],
    validate: false,
  });
