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
exports.ProductResolver = void 0;
const Product_1 = require("../entities/Product");
const type_graphql_1 = require("type-graphql");
const __1 = require("..");
const Tag_1 = require("../entities/Tag");
const typeorm_1 = require("typeorm");
let ProductResolver = class ProductResolver {
    products() {
        return Product_1.Product.find();
    }
    productsByShopId(shopId) {
        return __1.dataSource
            .getRepository(Product_1.Product)
            .createQueryBuilder("product")
            .where("product.shopId = :id", { id: shopId })
            .orderBy('"updatedAt"', "DESC")
            .getMany();
    }
    product(id) {
        return Product_1.Product.findOneBy({ id });
    }
    async createProduct(name, price, amount, amountType, shopId, tags) {
        const product = Product_1.Product.create({
            name,
            shopId,
            price,
            amount,
            amountType,
        });
        product.tags = await Tag_1.Tag.findBy({ id: (0, typeorm_1.In)(tags) });
        return product.save();
    }
    async updateProductAmount(id, price) {
        const product = await Product_1.Product.findOneBy({ id });
        if (!product) {
            return null;
        }
        if (typeof price !== undefined) {
            await Product_1.Product.update({ id }, { price });
        }
        return product;
    }
    async updateProductPrice(id, amount) {
        const product = await Product_1.Product.findOneBy({ id });
        if (!product) {
            return null;
        }
        if (typeof amount !== undefined) {
            await Product_1.Product.update({ id }, { amount });
        }
        return product;
    }
    async deleteProduct(id) {
        try {
            Product_1.Product.delete({ id });
        }
        catch (error) {
            return false;
        }
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Product_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "products", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Product_1.Product]),
    __param(0, (0, type_graphql_1.Arg)("shopId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "productsByShopId", null);
__decorate([
    (0, type_graphql_1.Query)(() => Product_1.Product, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "product", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("price", () => type_graphql_1.Float)),
    __param(2, (0, type_graphql_1.Arg)("amount", () => type_graphql_1.Float)),
    __param(3, (0, type_graphql_1.Arg)("amountType")),
    __param(4, (0, type_graphql_1.Arg)("shopId")),
    __param(5, (0, type_graphql_1.Arg)("tags", () => [type_graphql_1.ID], { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, Number, Array]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("price", () => type_graphql_1.Float, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "updateProductAmount", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("amount", () => type_graphql_1.Float, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "updateProductPrice", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "deleteProduct", null);
ProductResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.js.map