"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthJWT = exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuth = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("not authenticated");
    }
    return next();
};
exports.isAuth = isAuth;
const isAuthJWT = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    console.log("authorization", authorization);
    if (!authorization) {
        throw new Error("Not authenticated");
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = (0, jsonwebtoken_1.verify)(token, "MySecretKey");
        console.log(payload);
        context.payload = payload;
    }
    catch (err) {
        console.log(err);
        throw new Error("Not authenticated");
    }
    return next();
};
exports.isAuthJWT = isAuthJWT;
//# sourceMappingURL=isAuth.js.map