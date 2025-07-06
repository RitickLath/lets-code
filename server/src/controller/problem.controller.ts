import { Request, Response } from "express";
import { Problem, User } from "../model";
import mongoose from "mongoose";
import { problemSchema } from "../utils/zodSchema";

interface CustomRequest extends Request {
  id?: string;
  role?: "User" | "Admin";
}

export const getAllProblems = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 0;
    const limit = 15;
    const skip = page * limit;

    const problems = await Problem.find()
      .limit(limit)
      .skip(skip)
      .select("title difficulty tags");

    res.status(200).json({
      success: true,
      data: problems,
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Server Error",
    });
  }
};

export const getProblemById = async (req: Request, res: Response) => {
  const { id: problemid } = req.params;

  if (!problemid) {
    res.status(400).json({
      success: false,
      data: null,
      error: "Problem ID is required",
    });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(problemid)) {
    res.status(400).json({
      success: false,
      data: null,
      error: "Invalid problem ID format",
    });
    return;
  }

  try {
    const problem = await Problem.findById(problemid).select(
      "-hiddenTestcase -discussions"
    );

    if (!problem) {
      res.status(404).json({
        success: false,
        data: null,
        error: "Problem not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: problem,
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

// left
export const addCommentToDiscussion = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const getDiscussionByProblemId = async (req: Request, res: Response) => {
  const { id: problemid } = req.params;

  if (!problemid) {
    res.status(400).json({
      success: false,
      data: null,
      error: "Problem ID is required",
    });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(problemid)) {
    res.status(400).json({
      success: false,
      data: null,
      error: "Invalid problem ID format",
    });
    return;
  }

  try {
    const discussions = await Problem.findById(problemid).select("discussions");

    if (!discussions) {
      res.status(404).json({
        success: false,
        data: null,
        error: "discussions not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: discussions,
      error: null,
    });
  } catch (error) {}
};

// Admin role only controllers
export const createProblem = async (req: Request, res: Response) => {
  try {
    const parsed = problemSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        data: null,
        error: parsed.error.flatten(),
      });
      return;
    }

    const sanitizedData = parsed.data;

    const newProblem = await Problem.create(sanitizedData);

    res.status(201).json({
      success: true,
      data: newProblem,
      error: null,
    });
  } catch (error) {
    console.error("Error creating problem:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error",
    });
  }
};

// left
export const updateProblem = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const deleteProblem = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title) {
      res.status(400).json({
        success: false,
        data: null,
        error: "Problem title is required",
      });
      return;
    }

    const loggedInUserId = (req as CustomRequest).id;

    const user = await User.findById(loggedInUserId);
    if (!user) {
      res.status(404).json({
        success: false,
        data: null,
        error: "User not found",
      });
      return;
    }

    const problem = await Problem.findOne({ title });
    if (!problem) {
      res.status(404).json({
        success: false,
        data: null,
        error: "Problem not found",
      });
      return;
    }

    // Authorization: allow only the author (by ObjectId)
    if (
      problem.author.toString() !==
      (user._id as mongoose.Types.ObjectId).toString()
    ) {
      res.status(403).json({
        success: false,
        data: null,
        error: "You are not authorized to delete this problem",
      });
      return;
    }

    await Problem.deleteOne({ _id: problem._id });

    res.status(200).json({
      success: true,
      data: `Problem titled '${title}' has been deleted successfully.`,
      error: null,
    });
  } catch (error) {
    console.error("Error deleting problem:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error",
    });
  }
};
