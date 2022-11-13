import {MikroORM} from '@mikro-orm/core';
import { COOKIE_NAME, __prod__ } from './constants';

import mikroOrmConfig from './mikro-orm.config';
import express from "express";
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import {buildSchema} from 'type-graphql'
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { AdminResolver } from './resolvers/admin';
import session from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";
import { MyContext } from './types';
import cors from "cors";




const main = async () => {
    const orm = await MikroORM.init(
        mikroOrmConfig
    );
   
    orm.getMigrator().up(); 
    // const emFork = orm.em.fork();

    const app = express();

    const RedisStore = connectRedis(session);

    const redisClient = createClient({ legacyMode: true })
    redisClient.connect().catch(console.error)


    app.use(
    cors({origin: "http://localhost:3000", credentials:true}),
    session({
        name: COOKIE_NAME,
        store: new RedisStore({ client: redisClient as any, disableTouch: true }),
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

    const appoloServer = new ApolloServer({
        schema: await buildSchema({resolvers: 
            [   HelloResolver, 
                PostResolver,
                AdminResolver
            ], 
        validate: false,
       

    },),
    context: ({req, res}): MyContext => ({em: orm.em, req, res})

    });

    appoloServer.applyMiddleware({app, cors: false}); 

    app.listen(4000, () => {
        console.log('server started on port 4000');
    });
}

main().catch((err) =>  {
    console.log(err); 
}); 

