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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopResolver = void 0;
const Shop_1 = require("../entities/Shop");
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/isAuth");
const __1 = require("..");
let ShopResolver = class ShopResolver {
    shops(limit, { req }) {
        const realLimit = Math.min(10, limit);
        return __1.dataSource
            .getRepository(Shop_1.Shop)
            .createQueryBuilder("shop")
            .where("shop.creatorId = :id", { id: req.session.userId })
            .orderBy('"updatedAt"', "DESC")
            .take(realLimit)
            .getMany();
    }
    shop(_id) {
        return Shop_1.Shop.findOneBy({ _id });
    }
    async createShop(name, { req }) {
        return Shop_1.Shop.create({ name, creatorId: req.session.userId }).save();
    }
    async updateShop(_id, name) {
        const shop = await Shop_1.Shop.findOneBy({ _id });
        if (!shop) {
            return null;
        }
        if (typeof name !== undefined) {
            Shop_1.Shop.update({ _id }, { name });
        }
        return shop;
    }
    async deleteShop(_id) {
        try {
            Shop_1.Shop.delete({ _id });
        }
        catch (error) {
            return false;
        }
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Shop_1.Shop]),
    __param(0, (0, type_graphql_1.Arg)("limit", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ShopResolver.prototype, "shops", null);
__decorate([
    (0, type_graphql_1.Query)(() => Shop_1.Shop, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShopResolver.prototype, "shop", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Shop_1.Shop),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShopResolver.prototype, "createShop", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Shop_1.Shop, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("name", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ShopResolver.prototype, "updateShop", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShopResolver.prototype, "deleteShop", null);
ShopResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ShopResolver);
exports.ShopResolver = ShopResolver;
//# sourceMappingURL=shop.js.map