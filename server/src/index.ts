import "reflect-metadata";
import * as dotenv from "dotenv"
import path from "path"
dotenv.config({
  path: path.resolve(__dirname,
      `../.env.${process.env.NODE_ENV || "development"}`
  ),
  debug: process.env.NODE_ENV === "development"
})

import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

import config from "./constants";
import { createSchema } from "./utils/createSchema";
import AppDataSource from "./datasource"

import { createClient, RedisClientOptions } from "redis"
import expressSession from "express-session"
import RedisStore from "connect-redis" 
import constants from "./constants";
import { ApolloContext } from "./types";

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
    cors({ origin: [config.frontend_url, config.studio_apollo_graphql_url]  , credentials:true })
  );

  // setting session
  const redisClientOption:RedisClientOptions = { 
    legacyMode: true ,
    url:`redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:6379` 
  }
  const redisClient = createClient(redisClientOption)
  redisClient.connect().catch(err => console.log("Redis connection error: ",err))
  const sessionStore = new (RedisStore(expressSession))({ client: redisClient })
  app.use(expressSession({
    name: "qid",
    store: sessionStore,
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // one month
      httpOnly: constants.__prod__, // only hide on production
      sameSite: "lax",
      secure: constants.__prod__,    
    }
  }))

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }): ApolloContext => ({ req, res })
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
