import { model, Schema } from "mongoose";
import { AuthOTP } from "../auth_types";

const schema = new Schema<AuthOTP>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    otp: { type: String, required: true },
    otpSalt: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 },
    expiresAt: { type: Date, required: true },
  },
  {
    versionKey: false,
  },
);

const OTPModel = model<AuthOTP>("OTP", schema, "OTP");
export default OTPModel;
