"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Ticket_1 = require("./Ticket");
const Product_1 = require("./Product");
const Tag_1 = require("./Tag");
const User_1 = require("./User");
let Shop = class Shop extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Shop.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shop.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Product_1.Product], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.shop),
    __metadata("design:type", Array)
], Shop.prototype, "products", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Tag_1.Tag], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Tag_1.Tag, (tag) => tag.shop),
    __metadata("design:type", Array)
], Shop.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Ticket_1.Ticket], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Ticket_1.Ticket, (ticket) => ticket.shopId),
    __metadata("design:type", Array)
], Shop.prototype, "tickets", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1.User], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => User_1.User, (user) => user.shop),
    __metadata("design:type", Array)
], Shop.prototype, "users", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Shop.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Shop.prototype, "updatedAt", void 0);
Shop = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Shop);
exports.Shop = Shop;
//# sourceMappingURL=Shop.js.map