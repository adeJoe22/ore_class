"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "USER",
        required: true,
    },
    resetPasswordSalt: { type: String, required: true },
    resetPasswordToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
}, { versionKey: false });
const UserPasswordResetToken = (0, mongoose_1.model)("UserPasswordResetToken", schema, "UserPasswordResetToken");
exports.default = UserPasswordResetToken;
