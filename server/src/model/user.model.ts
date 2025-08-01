import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "Admin" | "User";
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  likedProblem: mongoose.Types.ObjectId[];
  SavedProblem: mongoose.Types.ObjectId[];
  problemSolved: number;
  isPasswordCorrect(password: string): Promise<boolean>;
}

const UserSchema: Schema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: [20, "Max Length of username is 20 character."],
      minLength: [3, "Min Length of username is 3 character."],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props: any) => `${props.value} is not a valid email.`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    likedProblem: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Problem",
    },
    SavedProblem: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Problem",
    },
    problemSolved: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 8);
    next();
  } catch (error) {
    next(error as Error);
  }
});

UserSchema.methods.isPasswordCorrect = async function (
  this: IUser,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
