import mongoose, { Schema, Document } from "mongoose";

export interface IDiscussion extends Document {
  user: mongoose.Types.ObjectId;
  problemId: mongoose.Types.ObjectId;
  title: string;
  comment: string;
  replies: mongoose.Types.ObjectId[]; // Self-reference
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
}

const DiscussionSchema = new Schema<IDiscussion>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Discussion = mongoose.model<IDiscussion>(
  "Discussion",
  DiscussionSchema
);
