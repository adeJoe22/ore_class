"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../controller/post");
const auth_1 = require("../middleware/auth");
const userRouter = express_1.default.Router();
// Public routes
userRouter.post("/register", post_1.register);
userRouter.post("/login", post_1.login);
// Protected route - requires authentication
userRouter.post("/logout", auth_1.authenticate, post_1.logout);
exports.default = userRouter;
