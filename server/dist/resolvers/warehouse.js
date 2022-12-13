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
exports.WarehouseResolver = void 0;
const Warehouse_1 = require("../entities/Warehouse");
const type_graphql_1 = require("type-graphql");
let WarehouseResolver = class WarehouseResolver {
    warehousesOfShop(_shopId) {
        return Warehouse_1.Warehouse.findBy({ shopId: _shopId });
    }
    warehouse(_id) {
        return Warehouse_1.Warehouse.findOneBy({ _id });
    }
    async createWarehouse(name, location, shopId) {
        return Warehouse_1.Warehouse.create({ name, location, shopId }).save();
    }
    async updateWarehouse(_id, location, name) {
        const warehouse = await Warehouse_1.Warehouse.findOneBy({ _id });
        if (!warehouse) {
            return null;
        }
        if (typeof name !== undefined) {
            await Warehouse_1.Warehouse.update({ _id }, { name });
        }
        if (typeof location !== undefined) {
            await Warehouse_1.Warehouse.update({ _id }, { location });
        }
        return warehouse;
    }
    async deleteWarehouse(_id) {
        try {
            Warehouse_1.Warehouse.delete({ _id });
        }
        catch (error) {
            return false;
        }
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Warehouse_1.Warehouse]),
    __param(0, (0, type_graphql_1.Arg)("shopId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WarehouseResolver.prototype, "warehousesOfShop", null);
__decorate([
    (0, type_graphql_1.Query)(() => Warehouse_1.Warehouse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WarehouseResolver.prototype, "warehouse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Warehouse_1.Warehouse),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("location")),
    __param(2, (0, type_graphql_1.Arg)("shopId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], WarehouseResolver.prototype, "createWarehouse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Warehouse_1.Warehouse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("location")),
    __param(2, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], WarehouseResolver.prototype, "updateWarehouse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WarehouseResolver.prototype, "deleteWarehouse", null);
WarehouseResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], WarehouseResolver);
exports.WarehouseResolver = WarehouseResolver;
//# sourceMappingURL=warehouse.js.map