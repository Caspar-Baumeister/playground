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
exports.PosResolver = void 0;
const PointOfSell_1 = require("../entities/PointOfSell");
const type_graphql_1 = require("type-graphql");
const __1 = require("..");
let PosResolver = class PosResolver {
    allPointOfSell() {
        return PointOfSell_1.PointOfSell.find();
    }
    posByShopId(shopId) {
        return __1.dataSource
            .getRepository(PointOfSell_1.PointOfSell)
            .createQueryBuilder("pos")
            .where("pos.shopId = :id", { id: shopId })
            .orderBy("pos.updatedAt", "DESC")
            .getMany();
    }
    async createPointOfSell(shopId, name) {
        return PointOfSell_1.PointOfSell.create({ name, shopId }).save();
    }
    async deletePointOfSell(id) {
        try {
            PointOfSell_1.PointOfSell.delete({ id });
        }
        catch (error) {
            return false;
        }
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [PointOfSell_1.PointOfSell]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PosResolver.prototype, "allPointOfSell", null);
__decorate([
    (0, type_graphql_1.Query)(() => [PointOfSell_1.PointOfSell]),
    __param(0, (0, type_graphql_1.Arg)("shopId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PosResolver.prototype, "posByShopId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => PointOfSell_1.PointOfSell),
    __param(0, (0, type_graphql_1.Arg)("shopId")),
    __param(1, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PosResolver.prototype, "createPointOfSell", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PosResolver.prototype, "deletePointOfSell", null);
PosResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PosResolver);
exports.PosResolver = PosResolver;
//# sourceMappingURL=pos.js.map