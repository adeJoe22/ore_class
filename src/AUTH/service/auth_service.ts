import {
  GenerateHash,
  GenerateSalt,
} from "../../utils/auth/passwordUtils";
// import { generateTokenHex, hashToken } from "../../utils/helper";
import {
  AuthRepositoryType,
  IAdminInvitation,
  IAuth,
} from "../auth_types";
import crypto from "crypto";

export const userRegister = async (
  input: Partial<IAuth>,
  repository: AuthRepositoryType,
) => {
  return await repository.registration(input);
};

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

export const userLogin = async (
  email: string,
  password: string,
  repository: AuthRepositoryType,
) => {
  return await repository.login(email, password);
};

// export const refreshTokens = async (
//   refreshToken: string,
//   repository: AuthRepositoryType,
// ) => {
//   return await repository.grantTokens(refreshToken);
// };

export const userLogout = async (
  userId: unknown,
  refreshToken: string,
  repository: AuthRepositoryType,
) => {
  return await repository.logout(userId, refreshToken);
};

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
