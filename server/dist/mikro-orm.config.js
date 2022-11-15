"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Product_1 = require("./entities/Product");
const path_1 = __importDefault(require("path"));
const Admin_1 = require("./entities/Admin");
exports.default = {
    migrations: {
        glob: '!(*.d).{js,ts}',
        path: path_1.default.join(__dirname, './migrations'),
    },
    entities: [Product_1.Product, Admin_1.Admin],
    dbName: 'playground',
    type: 'postgresql',
    debug: !constants_1.__prod__,
    password: 'C4sp4R123',
};
//# sourceMappingURL=mikro-orm.config.js.map