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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = require("jsonwebtoken");
const type_graphql_1 = require("type-graphql");
const __1 = require("..");
const constants_1 = require("../constants");
const User_1 = require("../entities/User");
const isAuth_1 = require("../middleware/isAuth");
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let LoginResponse = class LoginResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], LoginResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
LoginResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginResponse);
let UserResolver = class UserResolver {
    users() {
        return __1.dataSource
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.shop", "shop")
            .getMany();
    }
    userOfShop({ payload }) {
        if (!(payload === null || payload === void 0 ? void 0 : payload.userId)) {
            return null;
        }
        return __1.dataSource
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .where("user.shopId = :id", { id: Number.parseFloat(payload.userId) })
            .leftJoinAndSelect("user.shop", "shop")
            .getMany();
    }
    async me({ payload }) {
        if (!(payload === null || payload === void 0 ? void 0 : payload.userId)) {
            return null;
        }
        return __1.dataSource
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .where("user.id = :id", { id: Number.parseFloat(payload === null || payload === void 0 ? void 0 : payload.userId) })
            .leftJoinAndSelect("user.shop", "shop")
            .getOne();
    }
    async addEmployee({ payload }, name, email, password, role) {
        if (!(payload === null || payload === void 0 ? void 0 : payload.userId)) {
            return {
                errors: [
                    {
                        field: "shopId",
                        message: "no shopId in token",
                    },
                ],
            };
        }
        if (name.length <= 2) {
            return {
                errors: [
                    {
                        field: "name",
                        message: "invalid name",
                    },
                ],
            };
        }
        if (email.length <= 2) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "invalid email",
                    },
                ],
            };
        }
        if (password.length <= 2) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "invalid password",
                    },
                ],
            };
        }
        const hashedPassword = await argon2_1.default.hash(password);
        try {
            await User_1.User.create({
                email,
                password: hashedPassword,
                name,
                shopId: Number.parseInt(payload.shopId),
                role,
            }).save();
        }
        catch (error) {
            console.log("ERR", error);
            if (error.code === "23505" || error.detail.includes["already exists"]) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "email already exists",
                        },
                    ],
                };
            }
            return {
                errors: [
                    {
                        field: "email",
                        message: error.detail,
                    },
                ],
            };
        }
        return {};
    }
    async register(name, email, password, shopId, role) {
        if (name.length <= 2) {
            return {
                errors: [
                    {
                        field: "name",
                        message: "invalid name",
                    },
                ],
            };
        }
        if (email.length <= 2) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "invalid email",
                    },
                ],
            };
        }
        if (password.length <= 2) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "invalid password",
                    },
                ],
            };
        }
        const hashedPassword = await argon2_1.default.hash(password);
        let user;
        try {
            user = await User_1.User.create({
                email,
                password: hashedPassword,
                name,
                shopId,
                role,
            }).save();
        }
        catch (error) {
            if (error.code === "23505" || error.detail.includes["already exists"]) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "email already exists",
                        },
                    ],
                };
            }
            return {
                errors: [
                    {
                        field: "email",
                        message: error.detail,
                    },
                ],
            };
        }
        return {
            accessToken: (0, jsonwebtoken_1.sign)({ userId: user.id, shopId: user.shopId }, "MySecretKey", {
                expiresIn: "365 days",
            }),
        };
    }
    async login(email, password) {
        const user = await User_1.User.findOneBy({ email: email });
        console.log("inside login", user);
        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "email doesn't exist",
                    },
                ],
            };
        }
        const valid = await argon2_1.default.verify(user.password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "incorrect password",
                    },
                ],
            };
        }
        return {
            accessToken: (0, jsonwebtoken_1.sign)({ userId: user.id, shopId: user.shopId }, "MySecretKey", {
                expiresIn: "365 days",
            }),
        };
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            else {
                resolve(true);
            }
        }));
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserResolver.prototype, "userOfShop", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => LoginResponse),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuthJWT),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("name")),
    __param(2, (0, type_graphql_1.Arg)("email")),
    __param(3, (0, type_graphql_1.Arg)("password")),
    __param(4, (0, type_graphql_1.Arg)("role")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addEmployee", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => LoginResponse),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("email")),
    __param(2, (0, type_graphql_1.Arg)("password")),
    __param(3, (0, type_graphql_1.Arg)("shopId", () => type_graphql_1.ID)),
    __param(4, (0, type_graphql_1.Arg)("role")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => LoginResponse),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map