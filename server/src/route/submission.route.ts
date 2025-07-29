import { Router } from "express";
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
} from "../controller";
import { userAuth } from "../middleware";

export const submissionRouter = Router();

submissionRouter.post("/", userAuth, createSubmission);

// All Submissions (pagination)
submissionRouter.get("/", userAuth, getAllSubmissions);

// Submission of particular question
submissionRouter.get("/:id", userAuth, getSubmissionById);
