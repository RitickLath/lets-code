import { Router } from "express";
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
} from "../controller";
import {  userAuth } from "../middleware";

export const submissionRouter = Router();

submissionRouter.post("/", userAuth, createSubmission);
submissionRouter.get("/", getAllSubmissions);
submissionRouter.get("/:id", getSubmissionById);
