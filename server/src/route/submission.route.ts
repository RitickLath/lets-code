import { Router } from "express";
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
} from "../controller";

export const submissionRouter = Router();

submissionRouter.post("/", createSubmission);
submissionRouter.get("/", getAllSubmissions);
submissionRouter.get("/:id", getSubmissionById);
