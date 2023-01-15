import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express, { Express } from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Ticket } from "./entities/Ticket";
import { PointOfSell } from "./entities/PointOfSell";
import { Product } from "./entities/Product";
import { Shop } from "./entities/Shop";
import { ShopUser } from "./entities/ShopUser";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";
import { ProductResolver } from "./resolvers/product";
import { ShopResolver } from "./resolvers/shop";
import { TagResolver } from "./resolvers/tag";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import { TicketProduct } from "./entities/TicketProduct";
import { PosResolver } from "./resolvers/pos";
import { TicketResolver } from "./resolvers/ticket";
import { ShopUserResolver } from "./resolvers/shopUser";

export const dataSource = new DataSource({
  type: "postgres",
  database: "playground",
  username: "postgres",
  password: "C4sp4R123",
  logging: true,
  synchronize: true,
  entities: [
    Product,
    User,
    Shop,
    Ticket,
    PointOfSell,
    Tag,
    ShopUser,
    TicketProduct,
  ],
});

const main = async () => {
  //typeorm creates the connection to the PostgreSql database

  // load entities, establish db connection, sync schema, etc.
  await dataSource.initialize();

  // // update to the latest version of migrations to the Orm entity
  // orm.getMigrator().up();

  // Express creates the server
  const app: Express = express();

  // Redis stores the cooky
  const RedisStore = connectRedis(session);
  const redis = new Redis();
  // redis.connect().catch(console.error)

  // Connect Redis to the server and define in which Browser the server runs
  app.use(
    cors({
      origin: new RegExp("/*/"),
      // origin: "http://localhost:3000",
      credentials: true,
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    }),
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis as any, disableTouch: true }),
      saveUninitialized: false,
      secret: "iansdfinveqriungan",
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, // cooky only works in https
      },
    })
  );

  // Init Appolo with the Type-Graphql schemas and the Context
  //
  const appoloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        ProductResolver,
        UserResolver,
        ShopResolver,
        TagResolver,
        PosResolver,
        TicketResolver,
        ShopUserResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  // Connect the appolo server to the Espress app
  appoloServer.applyMiddleware({ app, cors: false });

  // Run the server on Port 4000
  app.listen(4000, () => {
    console.log("server started on port 4000");
  });
};

main().catch((err) => {
  console.log(err);
});
