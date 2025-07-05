import mongoose, { Document, Schema } from "mongoose";

export interface ISubmission extends Document {
  user: mongoose.Types.ObjectId;
  problemId: mongoose.Types.ObjectId;
  code: string;
  language: "Java" | "Javascript" | "Python";
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Time Limit Exceeded";
  submittedAt: Date;
  executionTime: number; // in ms
  memoryUsed: number; // in KB
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["Java", "Javascript", "Python"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Runtime Error",
        "Time Limit Exceeded",
      ],
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    executionTime: {
      type: Number, // in milliseconds
    },
    memoryUsed: {
      type: Number, // in kilobytes
    },
  },
  { timestamps: true }
);

export const Submission = mongoose.model<ISubmission>(
  "Submission",
  SubmissionSchema
);
