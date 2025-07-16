import mongoose, { Document, Schema } from "mongoose";

export interface IStarterCode extends Document {
  javaStarter: string;
  javaScriptStarter: string;
  pythonStarter: string;
}

const StarterCodeSchema = new Schema<IStarterCode>(
  {
    javaStarter: {
      type: String,
      required: true,
    },
    javaScriptStarter: {
      type: String,
      required: true,
    },
    pythonStarter: { type: String, required: true },
  },
  { timestamps: true }
);

export const StarterCode = mongoose.model<IStarterCode>(
  "StarterCode",
  StarterCodeSchema
);
