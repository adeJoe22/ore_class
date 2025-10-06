import {
  GenerateHash,
  GenerateSalt,
  ValidateData,
} from "../../utils/auth/passwordUtils";
import {
  Authorization_Error,
  INTERNAL_SERVER_ERROR,
} from "../../utils/errors";

import { AuthRepositoryType, IAuth } from "../auth_types";
import OTPModel from "../model/OTP";
import UserModel from "../model/User";
import UserPasswordResetToken from "../model/UserPassword";
import {
  accessExpiration,
  generateOTP,
  generateToken,
  refreshExpiration,
  verifyToken,
} from "../service/auth_token_service";
// import PublisherModel from "../../PUBLISHER/model/Publisher";
import { AdminInvitation } from "../model/AdminInvite";
// import { hashToken } from "../../utils/helper";

const registration: AuthRepositoryType["registration"] = async (
  input,
) => {
  try {
    const checkUserExist = await UserModel.findOne({
      email: input.email!,
    });

    if (checkUserExist !== null)
      throw new Authorization_Error("User email unavailable");

    if (input.terms_condition !== true)
      throw new Authorization_Error(
        "You cannot continue until you agree with our terms and conditions",
      );

    // Handle roles
    // let roles = ["reader"]; // Default role
    // if (input.roles && input.roles.length > 0) {
    //   roles = input.roles;
    // }

    const salt = await GenerateSalt();
    const hashedPassword = await GenerateHash(input.password!, salt);

    const newUser = new UserModel({
      ...input,
      password: hashedPassword,
      salt,
      terms_condition: input.terms_condition!,
    });

    // Generate OTP
    const otp = generateOTP();
    const otpSalt = await GenerateSalt();
    const hashedOTP = await GenerateHash(otp, otpSalt);

    // OTP expires in 10 minutes
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    await OTPModel.create({
      owner: newUser._id,
      otp: hashedOTP,
      otpSalt,
      expiresAt,
    });

    // Send OTP via email
    // await sendOTPEmail(newUser.email, otp);

    // if (newUser.roles.includes("publisher")) {
    //   await PublisherModel.create({
    //     userId: newUser.id,
    //   });
    // }
    await newUser.save();

    return {
      message:
        "User created, please check your email for OTP to verify your account!",
      success: true,
      userId: newUser._id,
    };
  } catch (error: any) {
    throw new INTERNAL_SERVER_ERROR(error.message);
  }
};

// const verifyOTP: AuthRepositoryType["verifyOTP"] = async (
//   userId,
//   otp,
// ) => {
//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) throw new Authorization_Error("User not found");

//     const otpRecord = await OTPModel.findOne({ owner: userId });
//     if (!otpRecord)
//       throw new Authorization_Error("OTP expired or not found");

//     // Verify OTP
//     const isOTPValid = await ValidateData(
//       otp,
//       otpRecord.otp,
//       otpRecord.otpSalt,
//     );

//     // Compare OTPs
//     if (!isOTPValid) {
//       // authLogger.warn({ userId }, "Invalid OTP attempt");
//       throw new Authorization_Error("Invalid OTP");
//     }

//     // Check if OTP is expired
//     if (otpRecord.expiresAt < new Date()) {
//       // authLogger.warn({ userId }, "Expired OTP attempt");
//       throw new Authorization_Error("OTP expired");
//     }

//     // Mark user as verified
//     user.verified = true;
//     await user.save();

//     // Delete OTP record
//     await OTPModel.deleteOne({ _id: otpRecord._id });

//     return {
//       message: "Account verified successfully",
//       success: true,
//     };
//   } catch (error: any) {
//     throw new INTERNAL_SERVER_ERROR(error.message);
//   }
// };

const login: AuthRepositoryType["login"] = async (
  email,
  password,
) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Authorization_Error("Invalid email or password");
    }

    if (!user.verified) {
      throw new Authorization_Error("Account not verified");
    }

    const salt = user.salt;
    const hashedPassword = await GenerateHash(password, salt);

    if (hashedPassword !== user.password) {
      throw new Authorization_Error("Invalid email or password");
    }

    // Generate tokens
    const accessToken = generateToken({
      userId: user._id,
      exp: accessExpiration,
      iat: Math.floor(Date.now() / 1000),
      email: user.email,
    });
    const refreshToken = generateToken({
      userId: user._id,
      exp: refreshExpiration,
      iat: Math.floor(Date.now() / 1000),
      email: user.email,
    });

    // Store refresh token
    user.tokens.push(refreshToken);
    await user.save();

    return {
      accessToken,
      refreshToken,
      success: true,
      message: "user logged in",
      user: {
        id: user._id,
        email: user.email,
      },
    };
  } catch (error: any) {
    throw new INTERNAL_SERVER_ERROR(error.message);
  }
};

// const resendOTP: AuthRepositoryType["resendOTP"] = async (userId) => {
//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) throw new Authorization_Error("User not found");

//     // Delete existing OTP if any
//     await OTPModel.deleteOne({ owner: userId });

//     // Generate new OTP
//     const otp = generateOTP();
//     const otpSalt = await GenerateSalt();
//     const hashedOTP = await GenerateHash(otp, otpSalt);

//     // OTP expires in 10 minutes
//     const expiresAt = new Date();
//     expiresAt.setMinutes(expiresAt.getMinutes() + 10);

//     await OTPModel.create({
//       owner: userId,
//       otp: hashedOTP,
//       otpSalt,
//       expiresAt,
//     });

//     // Send OTP via email
//     await sendOTPEmail(user.email, otp);
//     authLogger.info({ userId, email: user.email }, "New OTP sent");

//     // Add audit log
//     writeAuditLog({
//       operation: "create",
//       collection_name: "OTP",
//       documentId: user?.id,
//       userId: user?.id,
//       metadata: { action: "resend_otp" },
//     });

//     return {
//       message: "New OTP sent to your email",
//       success: true,
//     };
//   } catch (error: any) {
//     throw new INTERNAL_SERVER_ERROR(error.message);
//   }
// };

// const grantTokens: AuthRepositoryType["grantTokens"] = async (
//   refreshToken,
// ) => {
//   try {
//     // Verify the refresh token
//     const payload = verifyToken(refreshToken);
//     if (!payload) {
//       authLogger.warn(
//         { token: "invalid" },
//         "Invalid refresh token attempt",
//       );
//       throw new Authorization_Error(
//         "Invalid or expired refresh token",
//       );
//     }

//     // Find the user
//     const user = await UserModel.findById(payload.userId);
//     if (!user) {
//       authLogger.warn(
//         { userId: payload.userId },
//         "Token refresh attempt for non-existent user",
//       );
//       throw new Authorization_Error("User not found");
//     }

//     // Check if the refresh token exists in the user's tokens array
//     if (!user.tokens.includes(refreshToken)) {
//       authLogger.warn(
//         { userId: user._id },
//         "Invalid refresh token not in user's tokens",
//       );
//       throw new Authorization_Error("Invalid refresh token");
//     }

//     // Generate new tokens
//     const newAccessToken = generateToken({
//       userId: user._id,
//       roles: user.roles,
//       exp: accessExpiration,
//       iat: Math.floor(Date.now() / 1000),
//       email: user.email,
//     });
//     const newRefreshToken = generateToken({
//       userId: user._id,
//       roles: user.roles,
//       exp: refreshExpiration,
//       iat: Math.floor(Date.now() / 1000),
//       email: user.email,
//     });

//     // Remove the old refresh token and add the new one
//     const updatedTokens = user.tokens.filter(
//       (token) => token !== refreshToken,
//     );
//     updatedTokens.push(newRefreshToken);
//     user.tokens = updatedTokens;
//     await user.save();

//     // Add audit log
//     writeAuditLog({
//       operation: "update",
//       collection_name: "USER",
//       documentId: user._id.toString(),
//       userId: user._id.toString(),
//       metadata: { action: "token_refresh" },
//     });

//     authLogger.info(
//       { userId: user._id },
//       "Tokens refreshed successfully",
//     );

//     return {
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//       success: true,
//       message: "token granted",
//     };
//   } catch (error: any) {
//     throw new INTERNAL_SERVER_ERROR(error.message);
//   }
// };

const logout: AuthRepositoryType["logout"] = async (
  userId,
  refreshToken,
) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Authorization_Error("User not found");
    }

    // Remove the refresh token from the user's tokens array
    user.tokens = user.tokens.filter(
      (token) => token !== refreshToken,
    );
    await user.save();

    return {
      message: "Logged out successfully",
      success: true,
    };
  } catch (error: any) {
    throw new INTERNAL_SERVER_ERROR(error.message);
  }
};

// const forgotPassword: AuthRepositoryType["forgotPassword"] = async (
//   email,
// ) => {
//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       // For security, we still return a success message
//       authLogger.info(
//         { email },
//         "Password reset requested for non-existent email",
//       );
//       return {
//         message:
//           "If your email is registered, you will receive a password reset link",
//         success: true,
//       };
//     }

//     // Delete any existing password reset tokens for this user
//     await UserPasswordResetToken.deleteMany({ owner: user._id });

//     // Generate a reset token
//     const resetToken = generateOTP();
//     const resetTokenSalt = await GenerateSalt();
//     const hashedResetToken = await GenerateHash(
//       resetToken,
//       resetTokenSalt,
//     );

//     // Token expires in 1 hour
//     const expiresAt = new Date();
//     expiresAt.setHours(expiresAt.getHours() + 1);

//     // Save the reset token
//     await UserPasswordResetToken.create({
//       owner: user._id,
//       resetPasswordToken: hashedResetToken,
//       resetPasswordSalt: resetTokenSalt,
//       expiresAt,
//     });

//     // Send the reset token via email
//     await sendPasswordResetEmail(user.email, resetToken);
//     authLogger.info(
//       { userId: user._id, email: user.email },
//       "Password reset token sent",
//     );

//     // Add audit log
//     writeAuditLog({
//       operation: "create",
//       collection_name: "PASSWORD_RESET",
//       documentId: user._id.toString(),
//       userId: user._id.toString(),
//       metadata: { action: "password_reset_requested" },
//     });

//     return {
//       message:
//         "If your email is registered, you will receive a password reset otp",
//       success: true,
//     };
//   } catch (error: any) {
//     throw new INTERNAL_SERVER_ERROR(error.message);
//   }
// };

// const resetPassword: AuthRepositoryType["resetPassword"] = async (
//   email,
//   token,
//   newPassword,
// ) => {
//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       authLogger.warn(
//         { email },
//         "Password reset attempt for non-existent email",
//       );
//       throw new Authorization_Error("Invalid reset request");
//     }

//     const resetRecord = await UserPasswordResetToken.findOne({
//       owner: user._id,
//     });
//     if (!resetRecord) {
//       authLogger.warn(
//         { userId: user._id },
//         "Password reset attempt with no valid token",
//       );
//       throw new Authorization_Error(
//         "Reset token expired or not found",
//       );
//     }

//     if (resetRecord.expiresAt < new Date()) {
//       await UserPasswordResetToken.deleteOne({
//         _id: resetRecord._id,
//       });
//       authLogger.warn(
//         { userId: user._id },
//         "Password reset attempt with expired token",
//       );
//       throw new Authorization_Error("Reset token expired");
//     }

//     const isTokenValid = await ValidateData(
//       token,
//       resetRecord.resetPasswordToken,
//       resetRecord.resetPasswordSalt,
//     );
//     if (!isTokenValid) {
//       authLogger.warn(
//         { userId: user._id },
//         "Password reset attempt with invalid token",
//       );
//       throw new Authorization_Error("Invalid reset token");
//     }

//     const newSalt = await GenerateSalt();
//     const hashedPassword = await GenerateHash(newPassword, newSalt);

//     user.password = hashedPassword;
//     user.salt = newSalt;
//     user.tokens = [];

//     await user.save();

//     await UserPasswordResetToken.deleteOne({
//       _id: resetRecord._id,
//     });

//     writeAuditLog({
//       operation: "update",
//       collection_name: "USER",
//       documentId: user._id.toString(),
//       userId: user._id.toString(),
//       metadata: { action: "password_reset_complete" },
//     });

//     authLogger.info(
//       { userId: user._id },
//       "Password reset completed successfully",
//     );

//     return {
//       message: "Password reset successful",
//       success: true,
//     };
//   } catch (error: any) {
//     throw new INTERNAL_SERVER_ERROR(error.message);
//   }
// };

// const updateRoles: AuthRepositoryType["updateRoles"] = async (
//   userId,
//   roles,
// ) => {
//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       authLogger.warn(
//         { userId },
//         "Role update attempt for non-existent user",
//       );
//       throw new Authorization_Error("User not found");
//     }

//     // Validate roles
//     const validRoles = ["buyer", "publisher"];
//     for (const role of roles) {
//       if (!validRoles.includes(role)) {
//         authLogger.warn(
//           { userId, role },
//           "Invalid role in update request",
//         );
//         throw new Authorization_Error(`Invalid role: ${role}`);
//       }
//     }

//     // Check if user is becoming a publisher
//     const isBecomingPublisher =
//       !user.roles.includes("publisher") &&
//       roles.includes("publisher");

//     // Store old roles for audit
//     const oldRoles = [...user.roles];

//     // Update roles
//     user.roles = roles;
//     await user.save();

//     // Add audit log
//     writeAuditLog({
//       operation: "update",
//       collection_name: "AUTH",
//       documentId: user._id.toString(),
//       userId: user._id.toString(),
//       before: { roles: oldRoles },
//       after: { roles },
//       metadata: { action: "roles_update", isBecomingPublisher },
//     });

//     authLogger.info(
//       { userId, oldRoles, newRoles: roles },
//       "User roles updated",
//     );

//     return {
//       message: "User roles updated successfully",
//       success: true,
//       roles: user.roles,
//     };
//   } catch (error: any) {
//     throw new INTERNAL_SERVER_ERROR(error.message);
//   }
// };
// const adminInvite: AuthRepositoryType["adminInvite"] = async (
//   input,
// ) => {
//   try {
//     const user = await UserModel.findOne({ email: input.email! });
//     if (user !== null) {
//       authLogger.warn({ email: input.email }, "User already exist");
//       throw new Authorization_Error("User already exist");
//     }

//     // Check if there's a used invitation first
//     const usedInvitation = await AdminInvitation.findOne({
//       email: input.email!.toLowerCase(),
//       used: true,
//     });

//     if (usedInvitation) {
//       authLogger.warn(
//         { email: input.email },
//         "Invitation already used",
//       );
//       throw new Authorization_Error(
//         "Invitation has already been used",
//       );
//     }

//     await AdminInvitation.findOneAndUpdate(
//       {
//         email: input.email!.toLowerCase(),
//         used: false,
//       },
//       {
//         $set: {
//           tokenHash: input.tokenHash!,
//           createdAt: input.createdAt!,
//           used: input.used!,
//           expiresAt: input.expiresAt,
//         },
//       },
//       {
//         upsert: true,
//         new: true,
//       },
//     );

//     authLogger.info(
//       { email: input.email },
//       "Invitation processed successfully",
//     );

//     const invitationLink = `frontend/invitation.html?token=${input?.token!}`;

//     console.log(invitationLink);

//     // send link via email
//     await sendInvitationEmail(input.email!, invitationLink);

//     return {
//       message: "Invitation sent successfully",
//       success: true,
//     };
//   } catch (error: any) {
//     throw new INTERNAL_SERVER_ERROR(error.message);
//   }
// };

// const verifyInvitationToken: AuthRepositoryType["verifyInvitationToken"] =
//   async (token) => {
//     try {
//       const tokenHash = hashToken(token);
//       const invitation = await AdminInvitation.findOne({
//         tokenHash,
//       });

//       if (!invitation) {
//         throw new Authorization_Error(
//           "Invalid or expired invitation",
//         );
//       }

//       // Check if invitation is expired
//       if (invitation.expiresAt < new Date()) {
//         throw new Authorization_Error("Invitation has expired");
//       }

//       invitation.used = true;
//       await invitation?.save();

//       return {
//         message: "Invitation verification successful",
//         success: true,
//       };
//     } catch (error: any) {
//       throw new INTERNAL_SERVER_ERROR(error.message);
//     }
//   };

// const completeInvitationRegistration: AuthRepositoryType["completeInvitationRegistration"] =
//   async (input) => {
//     try {
//       const { invitationToken, email, password, terms_condition } =
//         input;

//       const tokenHash = hashToken(invitationToken);
//       const invitation = await AdminInvitation.findOne({
//         tokenHash,
//       });

//       if (!invitation) {
//         authLogger.warn(
//           { email },
//           "No valid invitation found for registration",
//         );
//         throw new Authorization_Error(
//           "Invalid or expired invitation",
//         );
//       }

//       // Check if invitation is expired
//       if (invitation.expiresAt < new Date()) {
//         authLogger.warn(
//           { email },
//           "Invitation expired during registration",
//         );
//         throw new Authorization_Error("Invitation has expired");
//       }

//       const existingUser = await UserModel.findOne({
//         email: email!.toLowerCase(),
//       });
//       if (existingUser) {
//         authLogger.warn(
//           { email },
//           "User already exists during invitation registration",
//         );
//         throw new Authorization_Error("User already exists");
//       }

//       if (terms_condition !== true) {
//         throw new Authorization_Error(
//           "You cannot continue until you agree with our terms and conditions",
//         );
//       }

//       const roles = ["admin"];

//       const salt = await GenerateSalt();
//       const hashedPassword = await GenerateHash(password!, salt);

//       const newUser = new UserModel({
//         email: email!,
//         password: hashedPassword,
//         salt,
//         terms_condition: terms_condition!,
//         roles: roles,
//         registrationType: "email_password",
//         verified: true,
//       });

//       // Mark invitation as used
//       invitation.used = true;
//       await invitation.save();

//       await newUser.save();

//       // Add audit log
//       writeAuditLog({
//         operation: "create",
//         collection_name: "AUTH",
//         documentId: newUser._id.toString(),
//         after: {
//           email: newUser.email,
//           roles,
//           registrationType: "invitation",
//         },
//         metadata: {
//           invitationId: invitation._id.toString(),
//         },
//       });

//       authLogger.info(
//         { email: newUser.email, userId: newUser._id },
//         "User registered via invitation successfully",
//       );

//       return {
//         message: "Registration completed successfully!",
//         success: true,
//         userId: newUser._id,
//       };
//     } catch (error: any) {
//       throw new INTERNAL_SERVER_ERROR(error.message);
//     }
//   };
export const AuthRepository: AuthRepositoryType = {
  registration,
  // verifyOTP,
  // resendOTP,
  login,
  // grantTokens,
  logout,
  // forgotPassword,
  // resetPassword,
  // updateRoles,
  // adminInvite,
  // verifyInvitationToken,
  // completeInvitationRegistration,
};
