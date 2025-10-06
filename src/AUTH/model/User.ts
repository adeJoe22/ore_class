import { model, Schema } from "mongoose";
import { IAuth } from "../auth_types";

const schema = new Schema<IAuth>(
  {
    email: { type: String, required: true },
    password: { type: String },
    googleID: { type: String },
    registrationType: { type: String, default: "email_password" },
    terms_condition: { type: Boolean, default: false },
    tokens: [String],
    salt: String,
    verified: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
      },
    },
  },
);

const UserModel = model<IAuth>("USER", schema, "USER");
export default UserModel;
