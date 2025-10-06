import jwt from "jsonwebtoken";
import envVariable from "../../config/envVariable";

export interface UserPayload {
  userId: unknown;
  iat: number;
  exp: number;

  email: string;
}

export const generateToken = (payload: UserPayload) => {
  return jwt.sign(payload, envVariable.jwt.user.secret);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(
      token,
      envVariable.jwt.user.secret,
    ) as UserPayload;
  } catch (error) {
    return null;
  }
};

export const refreshExpiration =
  Math.floor(Date.now() / 1000) +
  60 * 60 * 24 * Number(envVariable.jwt.user.refreshExpiration); // days

export const accessExpiration =
  Math.floor(Date.now() / 1000) +
  60 * 60 * Number(envVariable.jwt.user.accessExpiration); // minutes

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
