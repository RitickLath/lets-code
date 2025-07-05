import { Request, Response } from "express";

export const registerUser = (req: Request, res: Response) => {
  res.send("Register user");
};

export const loginUser = (req: Request, res: Response) => {
  res.send("Login user");
};

export const getMe = (req: Request, res: Response) => {
  res.send("Get current user");
};
