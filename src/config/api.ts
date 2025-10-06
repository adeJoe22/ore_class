import { Router } from "express";
import userRouter from "../AUTH/route/auth_route";

const api = Router();

api.use("/user", userRouter);

export default api;
