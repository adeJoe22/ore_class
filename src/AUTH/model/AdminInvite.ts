import mongoose, { Schema, Document } from "mongoose";
import { IAdminInvitation } from "../auth_types";

const schema = new Schema<IAdminInvitation>(
  {
    email: { type: String, required: true, unique: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const AdminInvitation = mongoose.model<IAdminInvitation>(
  "AdminInvitation",
  schema,
  "AdminInvitation",
);
