"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const PointOfSell_1 = require("./entities/PointOfSell");
const Product_1 = require("./entities/Product");
const Shop_1 = require("./entities/Shop");
const Tag_1 = require("./entities/Tag");
const Ticket_1 = require("./entities/Ticket");
const TicketProduct_1 = require("./entities/TicketProduct");
const User_1 = require("./entities/User");
const pos_1 = require("./resolvers/pos");
const product_1 = require("./resolvers/product");
const shop_1 = require("./resolvers/shop");
const tag_1 = require("./resolvers/tag");
const ticket_1 = require("./resolvers/ticket");
const ticketProduct_1 = require("./resolvers/ticketProduct");
const user_1 = require("./resolvers/user");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    database: "playground",
    username: "postgres",
    password: "C4sp4R123",
    logging: true,
    synchronize: true,
    entities: [Product_1.Product, User_1.User, Shop_1.Shop, Ticket_1.Ticket, PointOfSell_1.PointOfSell, Tag_1.Tag, TicketProduct_1.TicketProduct],
});
const main = async () => {
    await exports.dataSource.initialize();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: new RegExp("/*/"),
        credentials: true,
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
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
                ticketProduct_1.TicketProductResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
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