import mongoose, { Document, Schema } from "mongoose";

export interface IStarterCode extends Document {
  problemId: mongoose.Types.ObjectId;
  language: "Java" | "Javascript" | "Python";
  starter: string;
}

const StarterCodeSchema = new Schema<IStarterCode>(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Problem",
    },
    language: {
      type: String,
      enum: ["Java", "Javascript", "Python"],
      required: [true, "Language is required"],
    },
    starter: {
      type: String,
      required: [true, "Starter code is required"],
    },
  },
  { timestamps: true }
);

export const StarterCode = mongoose.model<IStarterCode>(
  "StarterCode",
  StarterCodeSchema
);
