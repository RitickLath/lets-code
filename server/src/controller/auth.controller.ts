import { Request, Response } from "express";
import { signupSchema } from "../utils/zodSchema";
import { Submission, User } from "../model";
import z from "zod";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../middleware";
import mongoose from "mongoose";

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, role = "User" } = req.body;

  // Validate user input
  const parsed = signupSchema.safeParse({ email, password, username, role });
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      data: null,
      error: "Validation failed",
      errors: parsed.error.flatten(),
    });
    return;
  }

  try {
    // Check for duplicate email or username
    const isAlready = await User.findOne({ $or: [{ email }, { username }] });
    if (isAlready) {
      res.status(409).json({
        success: false,
        data: null,
        error: "Username or Email already exists",
      });
      return;
    }

    // Create new user
    const user = await User.create({ username, email, password, role });

    // Generate JWT token with role included
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          isPremium: user.isPremium,
          createdAt: user.createdAt,
        },
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Server error",
    });
  }
};

// Log in existing user with email or username
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { identifier, password, role = "User" } = req.body;

    // Validate required fields
    if (!identifier || !password) {
      res.status(400).json({
        success: false,
        data: null,
        error: "All fields are required.",
      });
      return;
    }

    // Determine identifier type
    const isEmail = z.string().email().safeParse(identifier);

    // conditionally made query
    const query = isEmail.success
      ? { email: identifier }
      : { username: identifier };

    // Find user and include password
    const user = await User.findOne(query).select("+password");

    if (!user || user.role !== role) {
      res.status(401).json({
        success: false,
        data: null,
        error: "Invalid credentials.",
      });
      return;
    }

    // Compare password
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        data: null,
        error: "Invalid credentials.",
      });
      return;
    }

    // Generate JWT with role
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          isPremium: user.isPremium,
        },
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Server error",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    console.log("No Token");
    res
      .status(401)
      .json({ success: false, message: null, error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    if (!decoded) {
      console.log("Not Decoded");
      res.status(403).json({
        success: false,
        data: null,
        error: "Access denied",
      });
      return;
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("No USer");
      res.status(404).json({
        success: false,
        data: null,
        error: "User no longer exists",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isPremium: user.isPremium,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

export const logOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res
      .status(201)
      .json({ success: true, message: "User Logged out.", error: null });
  } catch (error: any) {
    res
      .status(201)
      .json({ success: true, message: "User unable to logged out.", error });
  }
};

export const profile = async (req: Request, res: Response) => {
  const id = (req as CustomRequest).id;

  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id || "")) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
      error: "User ID format is incorrect",
      data: null,
    });
    return;
  }

  const userId = new mongoose.Types.ObjectId(id);

  try {
    const user = await User.findById(userId)
      .populate({
        path: "SavedProblem",
        select: "title difficulty",
      })
      .populate({
        path: "likedProblem",
        select: "title difficulty",
      })
      .select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User profile not found.",
        error: "User does not exist.",
        data: null,
      });
      return;
    }

    // Get the total number of submissions for the user
    const totalSubmissions = await Submission.countDocuments({ user: userId });

    //
    const submissions = await Submission.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: "problemId",
        select: "title difficulty",
      });

    const responseData = {
      email: user.email,
      username: user.username,
      likedProblem: user.likedProblem,
      SavedProblem: user.SavedProblem,
      createdAt: user.createdAt,
      problemSolved: user.problemSolved,
      recentSubmissions: submissions,
      totalSubmissions,
    };

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      error: null,
      data: responseData,
    });
  } catch (error: any) {}
};
