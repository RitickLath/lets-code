import { Router } from "express";
import {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
  addCommentToDiscussion,
  getDiscussionByProblemId,
  CreateStarterCode,
  difficultyProblem,
  searchProblem,
  tagsProblem,
  saveProblem,
  likeProblem,
} from "../controller";
import { adminAuth, userAuth } from "../middleware";

export const problemRouter = Router();

// // // // // // // // // // // // // // // // // // // // //

// Public Problem Routes

problemRouter.get("/", getAllProblems);
problemRouter.get("/id/:id", getProblemById);

// Public Problem Routes (Filter based routes)
problemRouter.get("/search", searchProblem);
problemRouter.get("/difficulty", difficultyProblem);
problemRouter.get("/tags", tagsProblem);

// // // // // // // // // // // // // // // // // // // // //

// User-only Routes

// save/unsave question
problemRouter.post("/save/:problemId", userAuth, saveProblem);

// like/unlike question
problemRouter.post("/like/:problemId", userAuth, likeProblem);

// Comment on Discussion
problemRouter.post("/comment/:id", userAuth, addCommentToDiscussion);

// Get Discussion for a Problem
problemRouter.get("/discussion/:id", userAuth, getDiscussionByProblemId);

// // // // // // // // // // // // // // // // // // // // //

// Admin-only Routes

problemRouter.post("/starter", adminAuth, CreateStarterCode);
problemRouter.post("/", createProblem); // will add adminauth
problemRouter.put("/", adminAuth, updateProblem);
problemRouter.delete("/", adminAuth, deleteProblem);
