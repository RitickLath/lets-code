import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {
  authRouter,
  problemRouter,
  profileRouter,
  submissionRouter,
} from "./route";
import { genAIRouter } from "./route/genai";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

export const app = express();

export const ai = new GoogleGenAI({});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/problems", problemRouter);
app.use("/api/submissions", submissionRouter);
app.use("/api/profile", profileRouter);
app.use("/api/ai", genAIRouter);
