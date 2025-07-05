import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  authRouter,
  problemRouter,
  profileRouter,
  submissionRouter,
} from "./route";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/problems", problemRouter);
app.use("/api/submissions", submissionRouter);
app.use("/api/profile", profileRouter);
