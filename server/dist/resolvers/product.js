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
const isAuth_1 = require("../middleware/isAuth");
let ProductResolver = class ProductResolver {
    products() {
        return Product_1.Product.find();
    }
    productsOfShop({ payload }) {
        if (!(payload === null || payload === void 0 ? void 0 : payload.shopId)) {
            return null;
        }
        return __1.dataSource
            .getRepository(Product_1.Product)
            .createQueryBuilder("product")
            .where("product.shopId = :id", { id: Number.parseFloat(payload.shopId) })
            .leftJoinAndSelect("product.tags", "tags")
            .orderBy('product."updatedAt"', "DESC")
            .getMany();
    }
    product(id) {
        return __1.dataSource
            .getRepository(Product_1.Product)
            .createQueryBuilder("product")
            .where("product.id = :id", { id: id })
            .leftJoinAndSelect("product.tags", "tags")
            .getOne();
    }
    async createProduct(name, price, amount, amountType, tags, { payload }) {
        console.log("payload", payload);
        if (!(payload === null || payload === void 0 ? void 0 : payload.shopId)) {
            return null;
        }
        const product = Product_1.Product.create({
            name,
            shopId: Number.parseFloat(payload.shopId),
            price,
            amount,
            amountType,
        });
        product.tags = await Tag_1.Tag.findBy({ id: (0, typeorm_1.In)(tags) });
        return product.save();
    }
    async updateProduct(id, name, price, amount, amountType, tags) {
        const product = await Product_1.Product.findOneBy({ id });
        if (!product) {
            return null;
        }
        if (name) {
            product.name = name;
        }
        if (price >= 0) {
            product.price = price;
        }
        if (amount >= 0) {
            product.amount = amount;
        }
        if (amountType == 1 || amountType == 0) {
            product.amountType = amountType;
        }
        if (tags) {
            product.tags = await Tag_1.Tag.findBy({ id: (0, typeorm_1.In)(tags) });
        }
        return product.save();
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
    (0, type_graphql_1.Query)(() => [Product_1.Product], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProductResolver.prototype, "productsOfShop", null);
__decorate([
    (0, type_graphql_1.Query)(() => Product_1.Product, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "product", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("price", () => type_graphql_1.Float)),
    __param(2, (0, type_graphql_1.Arg)("amount", () => type_graphql_1.Float)),
    __param(3, (0, type_graphql_1.Arg)("amountType")),
    __param(4, (0, type_graphql_1.Arg)("tags", () => [type_graphql_1.ID], { nullable: true })),
    __param(5, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, Array, Object]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("name", { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("price", () => type_graphql_1.Float, { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)("amount", () => type_graphql_1.Float, { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)("amountType", { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)("tags", () => [type_graphql_1.ID], { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Number, Number, Array]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "updateProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "deleteProduct", null);
ProductResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.js.map