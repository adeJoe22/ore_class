"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./config/api"));
const expressApp = (app) => {
    app.use(express_1.default.json()).use((0, cors_1.default)());
    app.get("/health", (req, res) => {
        res.status(200).json({ message: "App is healthy" });
    });
    app.use("/api/v1", api_1.default);
};
exports.default = expressApp;
