import express from "express";
import expressApp from "./expressApp";
import dbConnection from "./config/DB";

const app = express();
const server = async () => {
  try {
    await dbConnection();
    expressApp(app);
    app.listen(4400, () => console.log("Server running"));
  } catch (error: any) {
    console.log(error.message);
  }
};

server();
