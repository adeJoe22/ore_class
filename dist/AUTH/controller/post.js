"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.logout = exports.login = exports.register = void 0;
const authSchema_1 = require("../middleware/validation/authSchema");
const errors_1 = require("../../utils/errors");
const service = __importStar(require("../service/auth_service"));
const repository = __importStar(require("../repository/auth_repository"));
const repo = repository.AuthRepository;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Use contextual logging
    try {
        const { email, password, terms_condition } = req.body;
        const { error } = yield Promise.resolve(authSchema_1.registerSchema.validate(req.body));
        if (error === null || error === void 0 ? void 0 : error.details) {
            throw new errors_1.Validation_Error(error.details[0].message);
        }
        const response = yield service.userRegister({ email, password, terms_condition }, repo);
        res.status(errors_1.statusCode.CREATED).json(response);
    }
    catch (error) {
        res
            .status(errors_1.statusCode.INTERNAL_ERROR)
            .json({ message: error.message });
    }
});
exports.register = register;
// export const verifyOTP = async (req: Request, res: Response) => {
//   return authContextLogger.withContext({
//     operation: "verifyOTP",
//     userId: req.body.userId,
//   })(async () => {
//     try {
//       const { userId, otp } = req.body;
//       authContextLogger.info({ userId, otp }, "Verifying OTP");
//       const { error } = await Promise.resolve(
//         otpSchema.validate(req.body),
//       );
//       if (error?.details) {
//         authContextLogger.warn(
//           { error: error.details },
//           "Validation error during OTP verification",
//         );
//         throw new Validation_Error(error.details[0].message);
//       }
//       const response = await service.verifyOTP(userId, otp, repo);
//       authContextLogger.info({ userId }, "OTP verified successfully");
//       res.status(statusCode.OK).json(response);
//     } catch (error: any) {
//       authContextLogger.error(
//         { error: error.message },
//         "OTP verification failed",
//       );
//       res
//         .status(statusCode.INTERNAL_ERROR)
//         .json({ message: error.message });
//     }
//   });
// };
// export const resendOTP = async (req: Request, res: Response) => {
//   return authContextLogger.withContext({
//     operation: "resendOTP",
//     userId: req.body.userId,
//   })(async () => {
//     try {
//       const { userId } = req.body;
//       authContextLogger.info({ userId }, "Resending OTP");
//       if (!userId) {
//         authContextLogger.warn(
//           { message: "User ID is required" },
//           "Validation error",
//         );
//         throw new Validation_Error("User ID is required");
//       }
//       const response = await service.resendOTP(userId, repo);
//       authContextLogger.info({ userId }, "OTP resent successfully");
//       res.status(statusCode.OK).json(response);
//     } catch (error: any) {
//       authContextLogger.error(
//         { error: error.message },
//         "Resending OTP failed",
//       );
//       res
//         .status(statusCode.INTERNAL_ERROR)
//         .json({ message: error.message });
//     }
//   });
// };
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { error } = yield Promise.resolve(authSchema_1.loginSchema.validate(req.body));
        if (error === null || error === void 0 ? void 0 : error.details) {
            throw new errors_1.Validation_Error(error.details[0].message);
        }
        const response = yield service.userLogin(email, password, repo);
        res.status(errors_1.statusCode.OK).json(response);
    }
    catch (error) {
        res
            .status(errors_1.statusCode.INTERNAL_ERROR)
            .json({ message: error.message });
    }
});
exports.login = login;
// export const refreshToken = async (req: Request, res: Response) => {
//   return authContextLogger.withContext({
//     operation: "refreshToken",
//   })(async () => {
//     try {
//       const { refreshToken } = req.body;
//       authContextLogger.info(
//         { message: "Refreshing token" },
//         "Token refresh attempt",
//       );
//       const { error } = await Promise.resolve(
//         refreshTokenSchema.validate(req.body),
//       );
//       if (error?.details) {
//         authContextLogger.warn(
//           { error: error.details },
//           "Validation error during token refresh",
//         );
//         throw new Validation_Error(error.details[0].message);
//       }
//       const response = await service.refreshTokens(
//         refreshToken,
//         repo,
//       );
//       authContextLogger.info(
//         { message: "Token refreshed successfully" },
//         "Token refresh completed",
//       );
//       res.status(statusCode.OK).json(response);
//     } catch (error: any) {
//       authContextLogger.error(
//         { error: error.message },
//         "Token refresh failed",
//       );
//       res
//         .status(statusCode.INTERNAL_ERROR)
//         .json({ message: error.message });
//     }
//   });
// };
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, refreshToken } = req.body;
        if (!userId || !refreshToken) {
            throw new errors_1.Validation_Error("User ID and refresh token are required");
        }
        const response = yield service.userLogout(userId, refreshToken, repo);
        res.status(errors_1.statusCode.OK).json(response);
    }
    catch (error) {
        res
            .status(errors_1.statusCode.INTERNAL_ERROR)
            .json({ message: error.message });
    }
});
exports.logout = logout;
// export const forgotPasswordRequest = async (
//   req: Request,
//   res: Response,
// ) => {
//   return authContextLogger.withContext({
//     operation: "forgotPasswordRequest",
//     userEmail: req.body.email,
//   })(async () => {
//     try {
//       const { email } = req.body;
//       authContextLogger.info({ email }, "Requesting password reset");
//       const { error } = await Promise.resolve(
//         forgotPasswordSchema.validate(req.body),
//       );
//       if (error?.details) {
//         authContextLogger.warn(
//           { error: error.details },
//           "Validation error during forgot password request",
//         );
//         throw new Validation_Error(error.details[0].message);
//       }
//       const response = await service.forgotPassword(email, repo);
//       authContextLogger.info(
//         { email },
//         "Password reset request processed",
//       );
//       res.status(statusCode.OK).json(response);
//     } catch (error: any) {
//       authContextLogger.error(
//         { error: error.message },
//         "Forgot password request failed",
//       );
//       res
//         .status(statusCode.INTERNAL_ERROR)
//         .json({ message: error.message });
//     }
//   });
// };
// export const resetPasswordRequest = async (
//   req: Request,
//   res: Response,
// ) => {
//   return authContextLogger.withContext({
//     operation: "resetPasswordRequest",
//     email: req.body.email,
//   })(async () => {
//     try {
//       const { email, token, newPassword } = req.body;
//       authContextLogger.info({ email }, "Resetting password");
//       const { error } = await Promise.resolve(
//         resetPasswordSchema.validate(req.body),
//       );
//       if (error?.details) {
//         authContextLogger.warn(
//           { error: error.details },
//           "Validation error during reset password request",
//         );
//         throw new Validation_Error(error.details[0].message);
//       }
//       const response = await service.resetPassword(
//         email,
//         token,
//         newPassword,
//         repo,
//       );
//       authContextLogger.info(
//         { email },
//         "Password reset successfully",
//       );
//       res.status(statusCode.OK).json(response);
//     } catch (error: any) {
//       authContextLogger.error(
//         { error: error.message },
//         "Reset password failed",
//       );
//       res
//         .status(statusCode.INTERNAL_ERROR)
//         .json({ message: error.message });
//     }
//   });
// };
// export const updateUserRoles = async (
//   req: AuthenticatedRequest,
//   res: Response,
// ) => {
//   return authContextLogger.withContext({
//     operation: "updateUserRoles",
//     userId: req.body.userId,
//   })(async () => {
//     try {
//       const { userId, roles } = req.body;
//       authContextLogger.info(
//         { userId, roles },
//         "Updating user roles",
//       );
//       const { error } = await Promise.resolve(
//         updateRolesSchema.validate(req.body),
//       );
//       if (error?.details) {
//         authContextLogger.warn(
//           { error: error.details },
//           "Validation error during update user roles",
//         );
//         throw new Validation_Error(error.details[0].message);
//       }
//       // Only admins can update other users' roles
//       // Users can update their own roles
//       if (
//         req.user?.userId !== userId &&
//         !req.user?.roles.includes("admin")
//       ) {
//         authContextLogger.warn(
//           {
//             userId: req.user?.userId,
//             targetUserId: userId,
//             roles: req.user?.roles,
//           },
//           "Unauthorized attempt to update roles for another user",
//         );
//         throw new Validation_Error(
//           "You are not authorized to update roles for this user",
//         );
//       }
//       // Prevent non-admins from giving themselves admin role
//       if (
//         !req.user?.roles.includes("admin") &&
//         roles.includes("admin")
//       ) {
//         authContextLogger.warn(
//           {
//             userId: req.user?.userId,
//             roles: req.user?.roles,
//             attemptedRoles: roles,
//           },
//           "Unauthorized attempt to assign admin role to self",
//         );
//         throw new Validation_Error(
//           "You cannot assign admin role to yourself",
//         );
//       }
//       const response = await service.updateUserRoles(
//         userId,
//         roles,
//         repo,
//       );
//       authContextLogger.info(
//         { userId, roles: response.roles },
//         "User roles updated successfully",
//       );
//       res.status(statusCode.OK).json(response);
//     } catch (error: any) {
//       authContextLogger.error(
//         { error: error.message },
//         "Update user roles failed",
//       );
//       res
//         .status(statusCode.INTERNAL_ERROR)
//         .json({ message: error.message });
//     }
//   });
// };
// export const adminInvite = async (
//   req: AuthenticatedRequest,
//   res: Response,
// ) => {
//   return authContextLogger.withContext({
//     operation: "inviteAdmin",
//     email: req.body.email,
//   })(async () => {
//     try {
//       const { email } = req.body;
//       authContextLogger.info({ email }, "Inviting Admin");
//       const { error } = await Promise.resolve(
//         inviteAdminSchema.validate(req.body),
//       );
//       if (error?.details) {
//         authContextLogger.warn(
//           { error: error.details },
//           "Validation error during admin invite",
//         );
//         throw new Validation_Error(error.details[0].message);
//       }
//       const response = await service.adminInvite(email, repo);
//       res.status(statusCode.OK).json(response);
//     } catch (error: any) {
//       authContextLogger.error(
//         { error: error.message },
//         "Admin invitation failed",
//       );
//       res
//         .status(statusCode.INTERNAL_ERROR)
//         .json({ message: error.message });
//     }
//   });
// };
// export const verifyInviteController = async (
//   req: AuthenticatedRequest,
//   res: Response,
// ) => {
//   return authContextLogger.withContext({
//     operation: "verifyInvite",
//   })(async () => {
//     try {
//       authContextLogger.info(
//         { token: req.params.token },
//         "Verify invite",
//       );
//       const { error } = await Promise.resolve(
//         verifyInviteSchema.validate(req.params.token),
//       );
//       if (error?.details) {
//         authContextLogger.warn(
//           { error: error.details },
//           "Validation error during Verify invite",
//         );
//         throw new Validation_Error(error.details[0].message);
//       }
//       const response = await service.verifyInvitationToken(
//         req.params.token,
//         repo,
//       );
//       res.status(statusCode.OK).json(response);
//     } catch (error: any) {
//       authContextLogger.error(
//         { error: error.message },
//         "verify Invite failed",
//       );
//       res
//         .status(statusCode.INTERNAL_ERROR)
//         .json({ message: error.message });
//     }
//   });
// };
// export const completeInvitationRegistrationController = async (
//   req: AuthenticatedRequest,
//   res: Response,
// ) => {
//   return authContextLogger.withContext({
//     operation: "complete invite",
//     email: req.body.email,
//   })(async () => {
//     try {
//       authContextLogger.info(
//         { email: req.body.email },
//         "completing Admin",
//       );
//       const { error } = await Promise.resolve(
//         completeInvitationRegistrationSchema.validate(req.body),
//       );
//       if (error?.details) {
//         authContextLogger.warn(
//           { error: error.details },
//           "Validation error during admin invite",
//         );
//         throw new Validation_Error(error.details[0].message);
//       }
//       const response = await service.completeInvitationRegistration(
//         { ...req.body },
//         repo,
//       );
//       res.status(statusCode.OK).json(response);
//     } catch (error: any) {
//       authContextLogger.error(
//         { error: error.message },
//         "complete invite failed",
//       );
//       res
//         .status(statusCode.INTERNAL_ERROR)
//         .json({ message: error.message });
//     }
//   });
// };
