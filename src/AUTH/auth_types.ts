export interface IAuth {
  //auth
  email: string;
  password: string;
  terms_condition: boolean;
  registrationType: "google" | "email_password";
  googleID: string;
  verified: boolean;
  salt: string;
  tokens: string[];
  // roles: Array<"reader" | "admin" | "publisher" | "super_admin">;

  verificationToken: string;
  verficationSalt: string;
  owner: unknown;
  resetPasswordToken: string;
  resetPasswordSalt: string;
  otp: string;
  otpSalt: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface IAdminInvitation {
  token: string;
  tokenHash: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
  email: string;
}
export type AuthOTP = Pick<
  IAuth,
  "otpSalt" | "otp" | "owner" | "createdAt" | "expiresAt"
>;

export type PasswordResetToken = Pick<
  IAuth,
  | "resetPasswordToken"
  | "resetPasswordSalt"
  | "owner"
  | "createdAt"
  | "expiresAt"
>;

// response types

export type UserId = unknown; // Change this to `number` or `ObjectId` as needed
export type UserRole =
  | "reader"
  | "admin"
  | "publisher"
  | "super_admin";

export interface BaseResponse {
  message: string;
  success: boolean;
}

export interface TokenResponse extends BaseResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends TokenResponse {
  user: {
    id: UserId;
    email: string;
    // roles: UserRole[];
  };
}

export interface RegistrationResponse extends BaseResponse {
  userId: UserId;
}

export interface UpdateRolesResponse extends BaseResponse {
  roles: UserRole[];
}
export interface AdminInviteResponse extends BaseResponse {
  data: IAdminInvitation;
}

// Function Types

export type Registration = (
  input: Partial<IAuth>,
) => Promise<RegistrationResponse>;

export type VerifyOTP = (
  userId: UserId,
  otp: string,
) => Promise<BaseResponse>;

export type ResendOTP = (userId: UserId) => Promise<BaseResponse>;

export type Login = (
  email: string,
  password: string,
) => Promise<LoginResponse>;

export type GrantTokens = (
  refreshToken: string,
) => Promise<TokenResponse | undefined>;

export type Logout = (
  id: UserId,
  refreshToken: string,
) => Promise<BaseResponse>;

export type ForgotPassword = (email: string) => Promise<BaseResponse>;

export type ResetPassword = (
  email: string,
  token: string,
  password: string,
) => Promise<BaseResponse>;

export type UpdateRoles = (
  userId: UserId,
  roles: UserRole[],
) => Promise<UpdateRolesResponse>;

export type AdminInvite = (
  input: Partial<IAdminInvitation>,
) => Promise<BaseResponse>;

// Add to AuthRepositoryType
export type VerifyInvitationToken = (
  token: string,
) => Promise<BaseResponse>;

export type CompleteInvitationRegistration = (
  input: Partial<IAuth> & { invitationToken: string },
) => Promise<RegistrationResponse>;

// Update AuthRepositoryType
export type AuthRepositoryType = {
  registration: Registration;
  // verifyOTP: VerifyOTP;
  // resendOTP: ResendOTP;
  login: Login;
  // grantTokens: GrantTokens;
  logout: Logout;
  // forgotPassword: ForgotPassword;
  // resetPassword: ResetPassword;
  // updateRoles: UpdateRoles;
  // adminInvite: AdminInvite;
  // verifyInvitationToken: VerifyInvitationToken;
  // completeInvitationRegistration: CompleteInvitationRegistration;
};
