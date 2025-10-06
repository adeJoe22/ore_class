"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.accessExpiration = exports.refreshExpiration = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envVariable_1 = __importDefault(require("../../config/envVariable"));
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, envVariable_1.default.jwt.user.secret);
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, envVariable_1.default.jwt.user.secret);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
exports.refreshExpiration = Math.floor(Date.now() / 1000) +
    60 * 60 * 24 * Number(envVariable_1.default.jwt.user.refreshExpiration); // days
exports.accessExpiration = Math.floor(Date.now() / 1000) +
    60 * 60 * Number(envVariable_1.default.jwt.user.accessExpiration); // minutes
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateOTP = generateOTP;
