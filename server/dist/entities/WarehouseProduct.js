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
exports.WarehouseProduct = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const Warehouse_1 = require("./Warehouse");
let WarehouseProduct = class WarehouseProduct extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], WarehouseProduct.prototype, "WarehouseId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Warehouse_1.Warehouse),
    (0, typeorm_1.ManyToOne)(() => Warehouse_1.Warehouse, (warehouse) => warehouse.warehouseProducts),
    __metadata("design:type", Warehouse_1.Warehouse)
], WarehouseProduct.prototype, "warehouse", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], WarehouseProduct.prototype, "ProductId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Product_1.Product),
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.warehouseProducts),
    __metadata("design:type", Product_1.Product)
], WarehouseProduct.prototype, "product", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WarehouseProduct.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(() => String),
    __metadata("design:type", String)
], WarehouseProduct.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WarehouseProduct.prototype, "shopId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WarehouseProduct.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WarehouseProduct.prototype, "updatedAt", void 0);
WarehouseProduct = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], WarehouseProduct);
exports.WarehouseProduct = WarehouseProduct;
//# sourceMappingURL=WarehouseProduct.js.map