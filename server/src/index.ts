import { COOKIE_NAME, __prod__ } from './constants';
import express from "express";
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import {buildSchema} from 'type-graphql'
import { HelloResolver } from './resolvers/hello';
import { ProductResolver } from './resolvers/product';
import { UserResolver } from './resolvers/user';
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { MyContext } from './types';
import cors from "cors";
import {DataSource} from 'typeorm'
import { Product } from './entities/Product';
import { User } from './entities/User';


export const dataSource = new DataSource({
    type: "postgres",
    database: "playground",
    username: "postgres",
    password: "C4sp4R123",
    logging: true,
    synchronize: true,
    entities: [Product, User]
    
})

// Main function is translated to js trough yarn watch and then run with yarn dev
const main = async () => {

    //typeorm creates the connection to the PostgreSql database
    
    // load entities, establish db connection, sync schema, etc.
    await dataSource.initialize()
    

    // // MikroOrm 
    // const orm = await MikroORM.init(
    //     mikroOrmConfig
    // );
   
    // // update to the latest version of migrations to the Orm entity
    // orm.getMigrator().up(); 

    // Express creates the server
    const app = express();

    // Redis stores the cooky
    const RedisStore = connectRedis(session);
    const redis = new Redis();
    // redis.connect().catch(console.error) 

    // Connect Redis to the server and define in which Browser the server runs
    app.use(
    cors({origin: "http://localhost:3000", credentials:true}),
    session({
        name: COOKIE_NAME,
        store: new RedisStore({ client: redis as any, disableTouch: true }),
        saveUninitialized: false,
        secret: "iansdfinveqriungan",
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            httpOnly: true,
            sameSite: 'lax',
            secure: __prod__ // cooky only works in https
        }
        
    }));

    // Init Appolo with the Type-Graphql schemas and the Context
    const appoloServer = new ApolloServer({
        schema: await buildSchema({resolvers: 
            [   HelloResolver, 
                ProductResolver,
                UserResolver
            ], 
        validate: false,
       

    },),
    context: ({req, res}): MyContext => ({req, res, redis})

    });

    // Connect the appolo server to the Espress app
    appoloServer.applyMiddleware({app, cors: false}); 

    // Run the server on Port 4000
    app.listen(4000, () => {
        console.log('server started on port 4000');
    });
}

main().catch((err) =>  {
    console.log(err); 
}); 

