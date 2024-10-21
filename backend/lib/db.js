import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (err) {
    console.log("Error connecting to mongoDB", err.message);
    process.exit(1);
  }
};
