import express, { Application, Request, Response } from "express";
import cors from "cors";
import api from "./config/api";

const expressApp = (app: Application) => {
  app.use(express.json()).use(cors());

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ message: "App is healthy" });
  });

  app.use("/api/v1", api);
};

export default expressApp;
