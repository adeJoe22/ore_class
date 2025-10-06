"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "USER",
        required: true,
    },
    otp: { type: String, required: true },
    otpSalt: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 },
    expiresAt: { type: Date, required: true },
}, {
    versionKey: false,
});
const OTPModel = (0, mongoose_1.model)("OTP", schema, "OTP");
exports.default = OTPModel;
