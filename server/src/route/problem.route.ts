import { Router } from "express";
import {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
  addCommentToDiscussion,
  getDiscussionByProblemId,
} from "../controller";
import { adminAuth, userAuth } from "../middleware";

export const problemRouter = Router();

// Public Problem Routes
problemRouter.get("/", getAllProblems);
problemRouter.get("/:id", getProblemById);

// Comment on Discussion
problemRouter.post("/comment/:id", userAuth, addCommentToDiscussion);

// Get Discussion for a Problem
problemRouter.get("/discussion/:id", userAuth, getDiscussionByProblemId);

// Admin-only Routes
problemRouter.post("/", adminAuth, createProblem);
problemRouter.put("/", adminAuth, updateProblem);
problemRouter.delete("/", adminAuth, deleteProblem);
