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
exports.TicketResolver = void 0;
const Ticket_1 = require("../entities/Ticket");
const type_graphql_1 = require("type-graphql");
const __1 = require("..");
let TicketResolver = class TicketResolver {
    tickets() {
        return Ticket_1.Ticket.find();
    }
    ticketsByShopId(shopId) {
        return __1.dataSource
            .getRepository(Ticket_1.Ticket)
            .createQueryBuilder("ticket")
            .where("ticket.shopId = :id", { id: shopId })
            .leftJoinAndSelect("ticket.pos", "pos")
            .leftJoinAndSelect("ticket.responsibleUser", "responsibleUser")
            .orderBy('ticket."updatedAt"', "DESC")
            .getMany();
    }
    ticketsByShopIdAndUserId(shopId, userId) {
        return __1.dataSource
            .getRepository(Ticket_1.Ticket)
            .createQueryBuilder("ticket")
            .where("ticket.shopId = :id", { id: shopId })
            .andWhere("ticket.responsibleUserId = :id", { id: userId })
            .leftJoinAndSelect("ticket.pos", "pos")
            .leftJoinAndSelect("ticket.responsibleUser", "responsibleUser")
            .orderBy('ticket."updatedAt"', "DESC")
            .getMany();
    }
    async createTicket(responsibleUserId, posId, startMoney, endMoney, shopId, status, date, startComment, endComment) {
        return Ticket_1.Ticket.create({
            responsibleUserId,
            date,
            endComment,
            posId,
            startComment,
            startMoney,
            shopId,
            status,
            endMoney,
        }).save();
    }
    ticket(id) {
        return (__1.dataSource
            .getRepository(Ticket_1.Ticket)
            .createQueryBuilder("ticket")
            .where("ticket.id = :id", { id })
            .getOne());
    }
    async deleteTicket(id) {
        try {
            Ticket_1.Ticket.delete({ id });
        }
        catch (error) {
            return false;
        }
        return true;
    }
    async deleteAll() {
        await __1.dataSource
            .getRepository(Ticket_1.Ticket)
            .createQueryBuilder("ticket")
            .delete()
            .from(Ticket_1.Ticket)
            .execute();
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Ticket_1.Ticket]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "tickets", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Ticket_1.Ticket]),
    __param(0, (0, type_graphql_1.Arg)("shopId", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "ticketsByShopId", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Ticket_1.Ticket]),
    __param(0, (0, type_graphql_1.Arg)("shopId", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "ticketsByShopIdAndUserId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Ticket_1.Ticket),
    __param(0, (0, type_graphql_1.Arg)("responsibleUserId", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("posId", () => type_graphql_1.ID)),
    __param(2, (0, type_graphql_1.Arg)("startMoney", () => type_graphql_1.Float)),
    __param(3, (0, type_graphql_1.Arg)("endMoney", () => type_graphql_1.Float, { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)("shopId", () => type_graphql_1.ID)),
    __param(5, (0, type_graphql_1.Arg)("status")),
    __param(6, (0, type_graphql_1.Arg)("date", () => Date)),
    __param(7, (0, type_graphql_1.Arg)("startComment", { nullable: true })),
    __param(8, (0, type_graphql_1.Arg)("endComment", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "createTicket", null);
__decorate([
    (0, type_graphql_1.Query)(() => Ticket_1.Ticket, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "ticket", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "deleteTicket", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "deleteAll", null);
TicketResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TicketResolver);
exports.TicketResolver = TicketResolver;
//# sourceMappingURL=ticket.js.map