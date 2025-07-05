import { Request, Response } from "express";

export const getAllProblems = (req: Request, res: Response) => {
  res.send("Get all problems");
};

export const getProblemById = (req: Request, res: Response) => {
  res.send("Get problem by ID");
};

export const createProblem = (req: Request, res: Response) => {
  res.send("Create new problem");
};

export const updateProblem = (req: Request, res: Response) => {
  res.send("Update problem");
};

export const deleteProblem = (req: Request, res: Response) => {
  res.send("Delete problem");
};
