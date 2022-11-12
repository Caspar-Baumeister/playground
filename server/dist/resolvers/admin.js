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
exports.AdminResolver = void 0;
const Admin_1 = require("../entities/Admin");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
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
let AdminResponse = class AdminResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], AdminResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Admin_1.Admin, { nullable: true }),
    __metadata("design:type", Admin_1.Admin)
], AdminResponse.prototype, "admin", void 0);
AdminResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], AdminResponse);
let AdminResolver = class AdminResolver {
    async me({ req, em }) {
        if (!req.session.adminId) {
            return null;
        }
        const fork = em.fork();
        const admin = await fork.findOne(Admin_1.Admin, { _id: req.session.adminId });
        return admin;
    }
    async register(options, { em, req }) {
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
        const fork = em.fork();
        const hashedPassword = await argon2_1.default.hash(options.password);
        const admin = fork.create(Admin_1.Admin, { email: options.email, password: hashedPassword });
        try {
            await fork.persistAndFlush(admin);
        }
        catch (error) {
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
        req.session.adminId = admin._id;
        return { admin: admin };
    }
    async login(options, { em, req }) {
        const fork = em.fork();
        const admin = await fork.findOne(Admin_1.Admin, { email: options.email });
        if (!admin) {
            return { errors: [{
                        field: "email",
                        message: "email doesn't exist"
                    }] };
        }
        const valid = await argon2_1.default.verify(admin.password, options.password);
        if (!valid) {
            return { errors: [{
                        field: "password",
                        message: "incorrect password"
                    }] };
        }
        req.session.adminId = admin._id;
        return { admin: admin };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => Admin_1.Admin, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AdminResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmailAndPassword, Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AdminResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmailAndPassword, Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "login", null);
AdminResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AdminResolver);
exports.AdminResolver = AdminResolver;
//# sourceMappingURL=admin.js.map