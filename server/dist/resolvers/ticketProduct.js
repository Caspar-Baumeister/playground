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
exports.TicketProductResolver = void 0;
const __1 = require("..");
const type_graphql_1 = require("type-graphql");
const TicketProduct_1 = require("../entities/TicketProduct");
let TicketProductResolver = class TicketProductResolver {
    async createTicketProducts(productIds, ticketId, startAmounts) {
        productIds.forEach(async (productId, index) => {
            const startAmount = startAmounts[index];
            if (startAmount > 0) {
                await TicketProduct_1.TicketProduct.create({
                    productId,
                    ticketId,
                    startAmount,
                }).save();
            }
        });
        return true;
    }
    async updateTicketProduct(ticketId, productId, startAmount, endAmount) {
        const ticketProduct = await TicketProduct_1.TicketProduct.findOneBy({
            ticketId,
            productId,
        });
        if (!ticketProduct) {
            return null;
        }
        if (startAmount >= 0) {
            ticketProduct.startAmount = startAmount;
        }
        if (endAmount >= 0) {
            ticketProduct.endAmount = endAmount;
        }
        return ticketProduct.save();
    }
    ticketProducts(ticketId) {
        return __1.dataSource
            .getRepository(TicketProduct_1.TicketProduct)
            .createQueryBuilder("tp")
            .where("tp.ticketId = :id", { id: ticketId })
            .leftJoinAndSelect("tp.product", "product")
            .getMany();
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("productIds", () => [type_graphql_1.ID])),
    __param(1, (0, type_graphql_1.Arg)("ticketId", () => type_graphql_1.ID)),
    __param(2, (0, type_graphql_1.Arg)("startAmounts", () => [type_graphql_1.Float])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Array]),
    __metadata("design:returntype", Promise)
], TicketProductResolver.prototype, "createTicketProducts", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => TicketProduct_1.TicketProduct, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("ticketId", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("productId", () => type_graphql_1.ID)),
    __param(2, (0, type_graphql_1.Arg)("startAmount")),
    __param(3, (0, type_graphql_1.Arg)("endAmount")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], TicketProductResolver.prototype, "updateTicketProduct", null);
__decorate([
    (0, type_graphql_1.Query)(() => [TicketProduct_1.TicketProduct], { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("ticketId", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketProductResolver.prototype, "ticketProducts", null);
TicketProductResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TicketProductResolver);
exports.TicketProductResolver = TicketProductResolver;
//# sourceMappingURL=ticketProduct.js.map