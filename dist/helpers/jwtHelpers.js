"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (userEmail) => {
    // Customize the token signing options according to your requirements
    const secretKey = process.env.JWT_SECRET || "default-secret-key";
    const expiresIn = "1h";
    const payload = {
        userEmail: userEmail,
    };
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn });
};
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.jwtHelpers = {
    createToken,
    verifyToken,
};
