import { Request, Response } from "express";
import {
  registerSchema,
  loginSchema,
  otpSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateRolesSchema,
  inviteAdminSchema,
  verifyInviteSchema,
  completeInvitationRegistrationSchema,
} from "../middleware/validation/authSchema";
import { statusCode, Validation_Error } from "../../utils/errors";
import * as service from "../service/auth_service";
import * as repository from "../repository/auth_repository";

import { AuthenticatedRequest } from "../middleware/auth";

const repo = repository.AuthRepository;

export const register = async (req: Request, res: Response) => {
  // Use contextual logging

  try {
    const { email, password, terms_condition } = req.body;

    const { error } = await Promise.resolve(
      registerSchema.validate(req.body),
    );

    if (error?.details) {
      throw new Validation_Error(error.details[0].message);
    }

    const response = await service.userRegister(
      { email, password, terms_condition },
      repo,
    );

    res.status(statusCode.CREATED).json(response);
  } catch (error: any) {
    res
      .status(statusCode.INTERNAL_ERROR)
      .json({ message: error.message });
  }
};

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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = await Promise.resolve(
      loginSchema.validate(req.body),
    );

    if (error?.details) {
      throw new Validation_Error(error.details[0].message);
    }

    const response = await service.userLogin(email, password, repo);

    res.status(statusCode.OK).json(response);
  } catch (error: any) {
    res
      .status(statusCode.INTERNAL_ERROR)
      .json({ message: error.message });
  }
};

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

export const logout = async (req: Request, res: Response) => {
  try {
    const { userId, refreshToken } = req.body;

    if (!userId || !refreshToken) {
      throw new Validation_Error(
        "User ID and refresh token are required",
      );
    }

    const response = await service.userLogout(
      userId,
      refreshToken,
      repo,
    );

    res.status(statusCode.OK).json(response);
  } catch (error: any) {
    res
      .status(statusCode.INTERNAL_ERROR)
      .json({ message: error.message });
  }
};

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
