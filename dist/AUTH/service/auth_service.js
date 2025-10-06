"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.userLogin = exports.userRegister = void 0;
const userRegister = (input, repository) => __awaiter(void 0, void 0, void 0, function* () {
    return yield repository.registration(input);
});
exports.userRegister = userRegister;
// export const verifyOTP = async (
//   userId: unknown,
//   otp: string,
//   repository: AuthRepositoryType,
// ) => {
//   return await repository.verifyOTP(userId, otp);
// };
// export const resendOTP = async (
//   userId: unknown,
//   repository: AuthRepositoryType,
// ) => {
//   return await repository.resendOTP(userId);
// };
const userLogin = (email, password, repository) => __awaiter(void 0, void 0, void 0, function* () {
    return yield repository.login(email, password);
});
exports.userLogin = userLogin;
// export const refreshTokens = async (
//   refreshToken: string,
//   repository: AuthRepositoryType,
// ) => {
//   return await repository.grantTokens(refreshToken);
// };
const userLogout = (userId, refreshToken, repository) => __awaiter(void 0, void 0, void 0, function* () {
    return yield repository.logout(userId, refreshToken);
});
exports.userLogout = userLogout;
// export const forgotPassword = async (
//   email: string,
//   repository: AuthRepositoryType,
// ) => {
//   return await repository.forgotPassword(email);
// };
// export const resetPassword = async (
//   email: string,
//   token: string,
//   newPassword: string,
//   repository: AuthRepositoryType,
// ) => {
//   return await repository.resetPassword(email, token, newPassword);
// };
// export const updateUserRoles = async (
//   userId: unknown,
//   roles: Array<"reader" | "publisher">,
//   repository: AuthRepositoryType,
// ) => {
//   return await repository.updateRoles(userId, roles);
// };
// export const adminInvite = async (
//   email: string,
//   repository: AuthRepositoryType,
// ) => {
//   const token = generateTokenHex(32);
//   const tokenHash = hashToken(token);
//   const expiresAt = new Date();
//   expiresAt.setHours(expiresAt.getHours() + 72);
//   const input: IAdminInvitation = {
//     token,
//     email,
//     expiresAt,
//     tokenHash,
//     used: false,
//     createdAt: new Date(),
//   };
//   return await repository.adminInvite(input);
// };
// export const verifyInvitationToken = async (
//   token: string,
//   repository: AuthRepositoryType,
// ) => {
//   return await repository.verifyInvitationToken(token);
// };
// export const completeInvitationRegistration = async (
//   input: Partial<IAuth> & { invitationToken: string },
//   repository: AuthRepositoryType,
// ) => {
//   return await repository.completeInvitationRegistration(input);
// };
