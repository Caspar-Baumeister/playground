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
exports.TagResolver = void 0;
const __1 = require("..");
const type_graphql_1 = require("type-graphql");
const Tag_1 = require("../entities/Tag");
const isAuth_1 = require("../middleware/isAuth");
let TagResolver = class TagResolver {
    tags() {
        return Tag_1.Tag.find();
    }
    tagsByShopId({ payload }) {
        if (!(payload === null || payload === void 0 ? void 0 : payload.shopId)) {
            return null;
        }
        return __1.dataSource
            .getRepository(Tag_1.Tag)
            .createQueryBuilder("tag")
            .where("tag.shopId = :id", {
            id: Number.parseFloat(payload.shopId),
        })
            .orderBy("tag.updatedAt", "DESC")
            .getMany();
    }
    tagsByShopIdWithProducts({ payload }) {
        var _a;
        return __1.dataSource
            .getRepository(Tag_1.Tag)
            .createQueryBuilder("tag")
            .where("tag.shopId = :id", {
            id: Number.parseFloat((_a = payload === null || payload === void 0 ? void 0 : payload.shopId) !== null && _a !== void 0 ? _a : ""),
        })
            .leftJoinAndSelect("tag.products", "product")
            .leftJoinAndSelect("product.tags", "tags")
            .orderBy("tag.updatedAt", "DESC")
            .orderBy("product.updatedAt", "DESC")
            .getMany();
    }
    tagsByIdsWithProducts({ payload }, ids) {
        var _a;
        return __1.dataSource
            .getRepository(Tag_1.Tag)
            .createQueryBuilder("tag")
            .where("tag.shopId = :id", {
            id: Number.parseFloat((_a = payload === null || payload === void 0 ? void 0 : payload.shopId) !== null && _a !== void 0 ? _a : ""),
        })
            .where("tag.id IN(:...ids)", { ids })
            .leftJoinAndSelect("tag.products", "product")
            .leftJoinAndSelect("product.tags", "tags")
            .orderBy("tag.updatedAt", "DESC")
            .orderBy("product.updatedAt", "DESC")
            .getMany();
    }
    async createTag({ payload }, name, description) {
        var _a;
        console.log("payload", payload);
        if (!(payload === null || payload === void 0 ? void 0 : payload.shopId)) {
            return null;
        }
        return Tag_1.Tag.create({
            name,
            shopId: Number.parseFloat((_a = payload === null || payload === void 0 ? void 0 : payload.shopId) !== null && _a !== void 0 ? _a : ""),
            description,
        }).save();
    }
    async updateTag(id, name) {
        const tag = await Tag_1.Tag.findOneBy({ id });
        if (!tag) {
            return null;
        }
        if (typeof name !== undefined) {
            await Tag_1.Tag.update({ id }, { name });
        }
        return tag;
    }
    async deleteTag(id) {
        try {
            Tag_1.Tag.delete({ id });
        }
        catch (error) {
            return false;
        }
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Tag_1.Tag], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "tags", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Tag_1.Tag], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TagResolver.prototype, "tagsByShopId", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Tag_1.Tag], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "tagsByShopIdWithProducts", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Tag_1.Tag], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("ids", () => [type_graphql_1.ID])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "tagsByIdsWithProducts", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Tag_1.Tag, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("name")),
    __param(2, (0, type_graphql_1.Arg)("description", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "createTag", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Tag_1.Tag, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("name", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "updateTag", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "deleteTag", null);
TagResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TagResolver);
exports.TagResolver = TagResolver;
//# sourceMappingURL=tag.js.map