import { Router } from "express";
import {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
} from "../controller";

export const problemRouter = Router();

problemRouter.get("/", getAllProblems);
problemRouter.get("/:id", getProblemById);

// Only Admin
problemRouter.post("/", createProblem);
problemRouter.put("/:id", updateProblem);
problemRouter.delete("/:id", deleteProblem);
