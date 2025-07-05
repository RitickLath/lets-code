import { Request, Response } from "express";

export const createSubmission = (req: Request, res: Response) => {
  res.send("Create submission");
};

export const getAllSubmissions = (req: Request, res: Response) => {
  res.send("Get all submissions");
};

export const getSubmissionById = (req: Request, res: Response) => {
  res.send("Get submission by ID");
};
