import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

process.env.NODE_ENV = "development";

import config from "./constants";
import { createSchema } from "./utils/createSchema";
import AppDataSource from "./datasource";

const main = async () => {
  let retries = Number(config.dbConnectionRetries);
  const retryTimeout = Number(config.timeoutBeforeRetry);

  while (retries) {
    try {
      const conn = await AppDataSource.initialize()
      await conn.synchronize();
      await conn.runMigrations();
      console.log("Data Source has been initialized!")
      break;
    } catch (error) {
      retries -= 1;
      console.log(error);
      console.log(`retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, retryTimeout));
    }
  }

  const app = express();

  //set up cors with express cors middleware
  app.use(
    cors({ origin: [config.frontend_url, config.studio_apollo_graphql_url] })
  );

  const apolloServer = new ApolloServer({
    schema: await createSchema()
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(config.port, () => {
    console.log(`server started on port ${config.port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
