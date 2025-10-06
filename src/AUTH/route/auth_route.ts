import express from "express";
import { register, login, logout } from "../controller/post";
import { authenticate } from "../middleware/auth";

const userRouter = express.Router();

// Public routes
userRouter.post("/register", register);
userRouter.post("/login", login);

// Protected route - requires authentication
userRouter.post("/logout", authenticate, logout);

export default userRouter;
