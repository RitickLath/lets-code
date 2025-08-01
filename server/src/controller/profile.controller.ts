import { Request, Response } from "express";

export const getProfile = (req: Request, res: Response) => {
  res.send("Get user profile");
};

export const updateProfile = (req: Request, res: Response) => {
  res.send("Update user profile");
};

