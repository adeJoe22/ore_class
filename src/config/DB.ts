import { connect } from "mongoose";
import envVariable from "./envVariable";

const uri = envVariable.mongo.local!;
const dbConnection = async () => {
  try {
    const con = await connect(uri);
    console.log(`Db connected to: ${con.connection.host}`);
  } catch (error: any) {
    console.log(error.message);
  }
};

export default dbConnection;
