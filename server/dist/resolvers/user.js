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
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const constants_1 = require("../constants");
const sendEmail_1 = require("../utiles/sendEmail");
const uuid_1 = require("uuid");
let EmailAndPassword = class EmailAndPassword {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EmailAndPassword.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EmailAndPassword.prototype, "password", void 0);
EmailAndPassword = __decorate([
    (0, type_graphql_1.InputType)()
], EmailAndPassword);
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
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserResolver = class UserResolver {
    async me({ req }) {
        if (!req.session.userId) {
            return null;
        }
        return await User_1.User.findOneBy({ _id: req.session.userId });
    }
    async changePassword(token, newPassword, { redis, req }) {
        if (newPassword.length < 2) {
            return { errors: [
                    {
                        field: "newPassword",
                        message: "lenght must be greater then 2"
                    }
                ] };
        }
        const key = constants_1.FORGET_PASSWORD_PREFIX + token;
        const userId = await redis.get(key);
        if (!userId) {
            return { errors: [{
                        field: "token",
                        message: "token expired"
                    }] };
        }
        const _id = parseInt(userId);
        const user = await User_1.User.findOneBy({ _id });
        if (!user) {
            return { errors: [{
                        field: "token",
                        message: "user no longer exist"
                    }] };
        }
        await User_1.User.update({ _id }, { password: await argon2_1.default.hash(newPassword) });
        req.session.userId = parseInt(userId);
        await redis.del(key);
        return { user: user };
    }
    async forgotPassword(email, { redis }) {
        const user = await User_1.User.findOneBy({ email });
        if (!user) {
            return true;
        }
        const token = (0, uuid_1.v4)();
        await redis.set(constants_1.FORGET_PASSWORD_PREFIX + token, user._id, "EX", 1000 * 60 * 60 * 24 * 3);
        (0, sendEmail_1.sendEmail)(email, `<a href= "http://localhost:3000/change-password/${token}"> reset password </a>`);
        return true;
    }
    async register(options, { req }) {
        if (options.email.length <= 2) {
            return { errors: [{
                        field: "email",
                        message: "invalid email"
                    }] };
        }
        if (options.password.length <= 2) {
            return { errors: [{
                        field: "password",
                        message: "invalid password"
                    }] };
        }
        const hashedPassword = await argon2_1.default.hash(options.password);
        let user;
        try {
            user = await User_1.User.create({ email: options.email, password: hashedPassword }).save();
        }
        catch (error) {
            console.log("ERR", error);
            if (error.code === "23505" || error.detail.includes["already exists"]) {
                return { errors: [{
                            field: "email",
                            message: "email already exists"
                        }] };
            }
            return { errors: [{
                        field: "email",
                        message: error.detail
                    }] };
        }
        req.session.userId = user._id;
        return { user: user };
    }
    async login(options, { req }) {
        const user = await User_1.User.findOneBy({ email: options.email });
        if (!user) {
            return { errors: [{
                        field: "email",
                        message: "email doesn't exist"
                    }] };
        }
        const valid = await argon2_1.default.verify(user.password, options.password);
        if (!valid) {
            return { errors: [{
                        field: "password",
                        message: "incorrect password"
                    }] };
        }
        req.session.userId = user._id;
        return { user: user };
    }
    logout({ req, res }) {
        return new Promise(resolve => req.session.destroy(err => {
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
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('token')),
    __param(1, (0, type_graphql_1.Arg)('newPassword')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('email')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmailAndPassword, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmailAndPassword, Object]),
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