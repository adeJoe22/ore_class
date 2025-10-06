import { Schema, model } from "mongoose";
import { PasswordResetToken } from "../auth_types";

const schema = new Schema<PasswordResetToken>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    resetPasswordSalt: { type: String, required: true },
    resetPasswordToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
  },
  { versionKey: false },
);

const UserPasswordResetToken = model<PasswordResetToken>(
  "UserPasswordResetToken",
  schema,
  "UserPasswordResetToken",
);

export default UserPasswordResetToken;
