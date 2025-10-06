"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String },
    googleID: { type: String },
    registrationType: { type: String, default: "email_password" },
    terms_condition: { type: Boolean, default: false },
    tokens: [String],
    salt: String,
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
}, {
    versionKey: false,
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
        },
    },
});
const UserModel = (0, mongoose_1.model)("USER", schema, "USER");
exports.default = UserModel;
