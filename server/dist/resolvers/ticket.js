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
const isAuth_1 = require("../middleware/isAuth");
let TicketResolver = class TicketResolver {
    tickets() {
        return Ticket_1.Ticket.find();
    }
    ticketsOfShop({ payload }) {
        if (!(payload === null || payload === void 0 ? void 0 : payload.shopId)) {
            return null;
        }
        return __1.dataSource
            .getRepository(Ticket_1.Ticket)
            .createQueryBuilder("ticket")
            .where("ticket.shopId = :id", { id: Number.parseFloat(payload.shopId) })
            .leftJoinAndSelect("ticket.pos", "pos")
            .leftJoinAndSelect("ticket.responsibleUser", "responsibleUser")
            .orderBy('ticket."updatedAt"', "DESC")
            .getMany();
    }
    ticketsOfUser({ payload }) {
        if (!(payload === null || payload === void 0 ? void 0 : payload.shopId) || !(payload === null || payload === void 0 ? void 0 : payload.userId)) {
            return null;
        }
        return __1.dataSource
            .getRepository(Ticket_1.Ticket)
            .createQueryBuilder("ticket")
            .where("ticket.shopId = :id", { id: Number.parseFloat(payload.shopId) })
            .where("ticket.responsibleUserId = :id", {
            id: Number.parseFloat(payload.userId),
        })
            .leftJoinAndSelect("ticket.pos", "pos")
            .leftJoinAndSelect("ticket.responsibleUser", "responsibleUser")
            .orderBy('ticket."updatedAt"', "DESC")
            .getMany();
    }
    async createTicket({ payload }, responsibleUserId, posId, startMoney, endMoney, status, date, startComment, midComment, endComment) {
        if (!(payload === null || payload === void 0 ? void 0 : payload.shopId)) {
            return null;
        }
        return Ticket_1.Ticket.create({
            responsibleUserId,
            date,
            endComment,
            posId,
            startComment,
            startMoney,
            midComment,
            shopId: Number.parseFloat(payload.shopId),
            status,
            endMoney,
        }).save();
    }
    async updateTicket(id, responsibleUserId, posId, startMoney, endMoney, status, startComment, midComment, endComment) {
        const ticket = await Ticket_1.Ticket.findOneBy({
            id,
        });
        if (!ticket) {
            return null;
        }
        if (responsibleUserId != null) {
            ticket.responsibleUserId = responsibleUserId;
        }
        if (posId != null) {
            ticket.posId = posId;
        }
        if (midComment != null) {
            ticket.midComment = midComment;
        }
        if (startMoney != null) {
            ticket.startMoney = startMoney;
        }
        if (endMoney != null) {
            ticket.endMoney = endMoney;
        }
        if (status != null) {
            ticket.status = status;
        }
        if (startComment != null) {
            ticket.startComment = startComment;
        }
        if (endComment != null) {
            ticket.endComment = endComment;
        }
        return ticket.save();
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
    async deleteAllTickets() {
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
    (0, type_graphql_1.Query)(() => [Ticket_1.Ticket], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TicketResolver.prototype, "ticketsOfShop", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Ticket_1.Ticket], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TicketResolver.prototype, "ticketsOfUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Ticket_1.Ticket, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("responsibleUserId", () => type_graphql_1.ID)),
    __param(2, (0, type_graphql_1.Arg)("posId", () => type_graphql_1.ID)),
    __param(3, (0, type_graphql_1.Arg)("startMoney", () => type_graphql_1.Float)),
    __param(4, (0, type_graphql_1.Arg)("endMoney", () => type_graphql_1.Float, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)("status")),
    __param(6, (0, type_graphql_1.Arg)("date", () => Date)),
    __param(7, (0, type_graphql_1.Arg)("startComment", { nullable: true })),
    __param(8, (0, type_graphql_1.Arg)("midComment", { nullable: true })),
    __param(9, (0, type_graphql_1.Arg)("endComment", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number, Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "createTicket", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Ticket_1.Ticket, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("responsibleUserId", () => type_graphql_1.ID, { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("posId", () => type_graphql_1.ID, { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)("startMoney", () => type_graphql_1.Float, { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)("endMoney", () => type_graphql_1.Float, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)("status", { nullable: true })),
    __param(6, (0, type_graphql_1.Arg)("startComment", { nullable: true })),
    __param(7, (0, type_graphql_1.Arg)("midComment", { nullable: true })),
    __param(8, (0, type_graphql_1.Arg)("endComment", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "updateTicket", null);
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
], TicketResolver.prototype, "deleteAllTickets", null);
TicketResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TicketResolver);
exports.TicketResolver = TicketResolver;
//# sourceMappingURL=ticket.js.map