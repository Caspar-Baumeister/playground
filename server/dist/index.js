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
const product_1 = require("./resolvers/product");
const user_1 = require("./resolvers/user");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Product_1 = require("./entities/Product");
const User_1 = require("./entities/User");
const Shop_1 = require("./entities/Shop");
const shop_1 = require("./resolvers/shop");
const Category_1 = require("./entities/Category");
const EventUser_1 = require("./entities/EventUser");
const PointOfSell_1 = require("./entities/PointOfSell");
const Warehouse_1 = require("./entities/Warehouse");
const WarehouseProduct_1 = require("./entities/WarehouseProduct");
const Event_1 = require("./entities/Event");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    database: "playground",
    username: "postgres",
    password: "C4sp4R123",
    logging: true,
    synchronize: true,
    entities: [
        Product_1.Product,
        User_1.User,
        Shop_1.Shop,
        Category_1.Category,
        Event_1.Event,
        EventUser_1.EventUser,
        PointOfSell_1.PointOfSell,
        Warehouse_1.Warehouse,
        WarehouseProduct_1.WarehouseProduct,
    ],
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
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
    }));
    const appoloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [product_1.ProductResolver, user_1.UserResolver, shop_1.ShopResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    appoloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("server started on port 4000");
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map