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
import {
  CreateStarterCode,
  difficultyProblem,
  searchProblem,
  tagsProblem,
} from "../controller/problem.controller";

export const problemRouter = Router();

// Public Problem Routes
problemRouter.get("/", getAllProblems);
problemRouter.get("/:id", getProblemById);

// Public Problem Routes (Filter based routes)
problemRouter.get("/search", searchProblem);
problemRouter.get("/difficulty", difficultyProblem);
problemRouter.get("/tags", tagsProblem);

// Comment on Discussion
problemRouter.post("/comment/:id", userAuth, addCommentToDiscussion);

// Get Discussion for a Problem
problemRouter.get("/discussion/:id", userAuth, getDiscussionByProblemId);

// Admin-only Routes

problemRouter.post("/starter", adminAuth, CreateStarterCode);
problemRouter.post("/", adminAuth, createProblem);
problemRouter.put("/", adminAuth, updateProblem);
problemRouter.delete("/", adminAuth, deleteProblem);
