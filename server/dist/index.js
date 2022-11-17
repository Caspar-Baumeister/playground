"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const product_1 = require("./resolvers/product");
const admin_1 = require("./resolvers/admin");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Product_1 = require("./entities/Product");
const Admin_1 = require("./entities/Admin");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    database: "playground",
    username: "postgres",
    password: "C4sp4R123",
    logging: true,
    synchronize: true,
    entities: [Product_1.Product, Admin_1.Admin]
});
const main = async () => {
    await exports.dataSource.initialize();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }), (0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({ client: redis, disableTouch: true }),
        saveUninitialized: false,
        secret: "iansdfinveqriungan",
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__
        }
    }));
    const appoloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({ resolvers: [hello_1.HelloResolver,
                product_1.ProductResolver,
                admin_1.AdminResolver
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis })
    });
    appoloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log('server started on port 4000');
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map