import Joi from "joi";

export enum RoleEnum {
  Reader = "reader",
  Publisher = "publisher",
}

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  terms_condition: Joi.boolean().valid(true).required(),
  roles: Joi.array()
    .items(Joi.string().valid(...Object.values(RoleEnum)))
    .default([RoleEnum.Reader]),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const otpSchema = Joi.object({
  userId: Joi.string().required(),
  otp: Joi.string().length(6).required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().required(),
  token: Joi.string().length(6).required(),
  newPassword: Joi.string().min(6).required(),
});

export const updateRolesSchema = Joi.object({
  userId: Joi.string().required(),
  roles: Joi.array()
    .items(Joi.string().valid(...Object.values(RoleEnum)))
    .min(1)
    .required(),
});
export const inviteAdminSchema = Joi.object({
  email: Joi.string().required(),
});
export const completeInvitationRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  terms_condition: Joi.boolean().valid(true).required(),
  invitationToken: Joi.string().required(),
});
export const verifyInviteSchema = Joi.string().required();
