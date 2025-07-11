import { ApolloServer } from "@apollo/server";
import { schema} from "./schema.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";
import {House,Character} from "./types.ts";

const CollectionCharacters = Array<Character>;
const CollectionHouses = Array<House> 
const server = new ApolloServer({
  typeDefs:schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ CollectionCharacters,CollectionHouses}),
});

console.info(`Server ready at ${url}`);