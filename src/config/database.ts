import mongoose from "mongoose";
import { IotData } from "../models/IotData";
import { logger } from "./logger";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    logger.info("Connected to MongoDB");

    await IotData.init();
    await IotData.createIndexes();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    logger.error(`Error connecting to MongoDB: ${errorMessage}`);

    process.exit(1);
  }
};

export default connectDB;
