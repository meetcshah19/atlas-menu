import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { MenuResolver } from "./resolvers/MenuResolver";
import { SectionResolver } from "./resolvers/SectionResolver";
import { ItemResolver } from "./resolvers/ItemResolver";
import { ModifierResolver } from "./resolvers/ModifierResolver";
import { ModifierGroupResolver } from "./resolvers/ModifierGroupResolver";

async function main() {
  const connection = await createConnection();
  const schema = await buildSchema({
    resolvers: [MenuResolver, SectionResolver, ItemResolver, ModifierResolver, ModifierGroupResolver],
    validate: false,
  });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log("Server has started!");
}

main();
