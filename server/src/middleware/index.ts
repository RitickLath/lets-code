import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model";

interface CustomRequest extends Request {
  id?: string;
  role?: "User" | "Admin";
}

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({
        success: false,
        data: null,
        error: "No token provided",
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    if (decoded.role !== "User") {
      res.status(403).json({
        success: false,
        data: null,
        error: "Access denied: User role required",
      });
      return;
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({
        success: false,
        data: null,
        error: "User no longer exists",
      });
      return;
    }

    (req as CustomRequest).id = decoded.id;
    (req as CustomRequest).role = decoded.role;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      data: null,
      error: "Invalid or expired token",
    });
  }
};

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({
        success: false,
        data: null,
        error: "No token provided",
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    if (decoded.role !== "Admin") {
      res.status(403).json({
        success: false,
        data: null,
        error: "Access denied: Admin role required",
      });
      return;
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({
        success: false,
        data: null,
        error: "Admin no longer exists",
      });
      return;
    }

    (req as CustomRequest).id = decoded.id;
    (req as CustomRequest).role = decoded.role;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      data: null,
      error: "Invalid or expired token",
    });
  }
};
