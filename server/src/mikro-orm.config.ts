import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from "path";
import { Admin } from "./entities/Admin";

export default {
    migrations: {
      glob: '!(*.d).{js,ts}',
      path: path.join(__dirname,'./migrations'), // path to the folder with migrations
    },
    entities: [Post, Admin], // no need for `entitiesTs` this way
    dbName: 'playground',
    type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
    debug: !__prod__,
    password: 'C4sp4R123',
  } as Parameters<typeof MikroORM.init>[0];