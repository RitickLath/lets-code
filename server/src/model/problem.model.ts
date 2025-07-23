import mongoose, { Document, Schema } from "mongoose";

export interface ITestCase {
  input: string;
  output: string;
}

export interface IProblem extends Document {
  title: string;
  description: string; // file name in frontend
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  author: mongoose.Types.ObjectId;
  discussions?: mongoose.Types.ObjectId;
  likeCount: number;
  dislikeCount: number;
  hint: string[];
  companies: string[];
}

const ProblemSchema = new Schema<IProblem>(
  {
    title: {
      type: String,
      required: [true, "Problem title is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      unique: true,
      required: [true, "Description is required"],
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: [true, "Difficulty level is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    discussions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
    hint: {
      type: [String],
      default: [],
    },
    companies: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Problem = mongoose.model<IProblem>("Problem", ProblemSchema);
