import mongoose from "mongoose";

export const databaseConnect = async () => {
  try {
    await mongoose.connect((process.env.MONOG_URI as string) || "");
    console.log("Database connected Successfully.");
  } catch (error: any) {
    console.log("Failed to connect with database." + error?.message);
  }
};
