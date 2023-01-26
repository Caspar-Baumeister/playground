"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const Ticket_1 = require("./entities/Ticket");
const PointOfSell_1 = require("./entities/PointOfSell");
const Product_1 = require("./entities/Product");
const Shop_1 = require("./entities/Shop");
const ShopUser_1 = require("./entities/ShopUser");
const Tag_1 = require("./entities/Tag");
const User_1 = require("./entities/User");
const product_1 = require("./resolvers/product");
const shop_1 = require("./resolvers/shop");
const tag_1 = require("./resolvers/tag");
const user_1 = require("./resolvers/user");
const TicketProduct_1 = require("./entities/TicketProduct");
const pos_1 = require("./resolvers/pos");
const ticket_1 = require("./resolvers/ticket");
const shopUser_1 = require("./resolvers/shopUser");
const ticketProduct_1 = require("./resolvers/ticketProduct");
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
        Ticket_1.Ticket,
        PointOfSell_1.PointOfSell,
        Tag_1.Tag,
        ShopUser_1.ShopUser,
        TicketProduct_1.TicketProduct,
    ],
});
const main = async () => {
    await exports.dataSource.initialize();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use((0, cors_1.default)({
        origin: new RegExp("/*/"),
        credentials: true,
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    }), (0, express_session_1.default)({
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
            resolvers: [
                product_1.ProductResolver,
                user_1.UserResolver,
                shop_1.ShopResolver,
                tag_1.TagResolver,
                pos_1.PosResolver,
                ticket_1.TicketResolver,
                shopUser_1.ShopUserResolver,
                ticketProduct_1.TicketProductResolver,
            ],
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