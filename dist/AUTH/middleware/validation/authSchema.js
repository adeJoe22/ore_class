"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyInviteSchema = exports.completeInvitationRegistrationSchema = exports.inviteAdminSchema = exports.updateRolesSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.refreshTokenSchema = exports.otpSchema = exports.loginSchema = exports.registerSchema = exports.RoleEnum = void 0;
const joi_1 = __importDefault(require("joi"));
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["Reader"] = "reader";
    RoleEnum["Publisher"] = "publisher";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
exports.registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    terms_condition: joi_1.default.boolean().valid(true).required(),
    roles: joi_1.default.array()
        .items(joi_1.default.string().valid(...Object.values(RoleEnum)))
        .default([RoleEnum.Reader]),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.otpSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    otp: joi_1.default.string().length(6).required(),
});
exports.refreshTokenSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});
exports.forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.resetPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    token: joi_1.default.string().length(6).required(),
    newPassword: joi_1.default.string().min(6).required(),
});
exports.updateRolesSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    roles: joi_1.default.array()
        .items(joi_1.default.string().valid(...Object.values(RoleEnum)))
        .min(1)
        .required(),
});
exports.inviteAdminSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
});
exports.completeInvitationRegistrationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    terms_condition: joi_1.default.boolean().valid(true).required(),
    invitationToken: joi_1.default.string().required(),
});
exports.verifyInviteSchema = joi_1.default.string().required();
