import express from "express";
import expressApp from "./expressApp";
import dbConnection from "./config/DB";
import envVariable from "./config/envVariable";

const PORT = envVariable.port!;
const app = express();
const server = async () => {
  try {
    await dbConnection();
    expressApp(app);
    app.listen(Number(PORT), () =>
      console.log("Server running on port: " + PORT),
    );
  } catch (error: any) {
    console.log(error.message);
  }
};

server();
