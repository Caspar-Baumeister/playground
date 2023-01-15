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
exports.ShopUserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const ShopUser_1 = require("../entities/ShopUser");
let ShopUserResolver = class ShopUserResolver {
    async createShopUser(shopId, userId, role) {
        return ShopUser_1.ShopUser.create({ shopId, userId, role }).save();
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => ShopUser_1.ShopUser),
    __param(0, (0, type_graphql_1.Arg)("shopId", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => type_graphql_1.ID)),
    __param(2, (0, type_graphql_1.Arg)("role")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ShopUserResolver.prototype, "createShopUser", null);
ShopUserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ShopUserResolver);
exports.ShopUserResolver = ShopUserResolver;
//# sourceMappingURL=shopUser.js.map