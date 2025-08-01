import { Request, Response } from "express";
import { Problem, StarterCode, User } from "../model";
import mongoose from "mongoose";
import { problemSchema } from "../utils/zodSchema";

interface CustomRequest extends Request {
  id?: string;
  role?: "User" | "Admin";
}

// Public controller

export const getAllProblems = async (req: Request, res: Response) => {
  try {
    // Step-1: Parse pagination query param from the request, default to page 0 if not provided
    const page = Number(req.query.page) || 0;

    // Step-2: Define the number of results per page
    const limit = 10;

    // Step-3: Calculate how many documents to skip based on page
    const skip = page * limit;

    // Step-4: Fetch paginated problems from DB, selecting only required fields
    const problems = await Problem.find()
      .limit(limit)
      .skip(skip)
      .select("title difficulty tags companies"); // return only necessary fields

    // Step-5: Respond with success and the list of problems
    res.status(200).json({
      success: true,
      data: problems,
      error: null,
    });
  } catch (error) {
    // Step-6: Log and respond with server error
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Server Error",
    });
  }
};

// will also send user have liked or not also user have saved or not. part left as its public route so need to make checks without middleares
export const getProblemById = async (req: Request, res: Response) => {
  // Step-1: Extract problem ID from route parameters
  const { id: problemid } = req.params;

  // Step-2: Return error if ID is not provided
  if (!problemid) {
    res.status(400).json({
      success: false,
      data: null,
      error: "Problem ID is required",
    });
    return;
  }

  // Step-3: Validate that the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(problemid)) {
    res.status(400).json({
      success: false,
      data: null,
      error: "Invalid problem ID format",
    });
    return;
  }

  const questionId = new mongoose.Types.ObjectId(problemid);

  try {
    // Step-4: Fetch the problem by ID
    //  Exclude and discussions
    //  Populate the 'author' field but only return the username
    const problem = await Problem.findById(questionId)
      .select(" -discussions")
      .populate({ path: "author", select: "username" });

    // Step-5: Return 404 if no matching problem is found
    if (!problem) {
      res.status(404).json({
        success: false,
        data: null,
        error: "Problem not found",
      });
      return;
    }

    // Step-6: Return the found problem
    res.status(200).json({
      success: true,
      data: problem,
      error: null,
    });
  } catch (error) {
    // Step-7: Handle server errors
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Server error",
    });
  }
};

export const searchProblem = async (req: Request, res: Response) => {
  // Step-1: Extract 'keyword' from query parameters
  const { keyword } = req.query;

  // Step-2: Validate that 'keyword' exists and is a string
  if (!keyword || typeof keyword !== "string") {
    res.status(400).json({
      success: false,
      message: "Please enter a valid keyword to search.",
      error: "Missing or invalid 'keyword' query parameter.",
    });
    return;
  }

  try {
    // Step-3: Perform case-insensitive search using regex on 'title'
    const questionsMatching = await Problem.find({
      title: { $regex: keyword, $options: "i" },
    }).select("title difficulty tags companies");

    // Step-4: Handle no matches found
    if (!questionsMatching || questionsMatching.length === 0) {
      res.status(404).json({
        success: false,
        message: "No matching problems found.",
        error: "No matching problems found.",
      });
      return;
    }

    // Step-5: Return matched problems
    res.status(200).json({
      success: true,
      message: "Matching problems retrieved successfully.",
      data: questionsMatching,
      error: null,
    });
  } catch (error) {
    // Step-6: Handle server errors
    console.error("Error searching problems:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: "Internal server error." + error,
    });
  }
};

export const difficultyProblem = async (req: Request, res: Response) => {
  // Step-1: Extract 'difficulty' from query parameters
  const { difficulty } = req.query;

  // Step-2: Validate that 'difficulty' exists and is a string
  if (!difficulty || typeof difficulty !== "string") {
    res.status(400).json({
      success: false,
      message: "Please enter a difficulty level to search for.",
      error: "Missing or invalid difficulty level.",
    });
    return;
  }

  // Step-3: Normalize difficulty to lowercase
  const normalizedDifficulty = difficulty.toLowerCase();

  // Step-4: Check if difficulty is one of the accepted values
  if (!["easy", "medium", "hard"].includes(normalizedDifficulty)) {
    res.status(400).json({
      success: false,
      message: "Invalid difficulty type. Must be 'Easy', 'Medium', or 'Hard'.",
      error: "Invalid difficulty level.",
    });
    return;
  }

  try {
    // Step-5: case-insensitive search for matching difficulty
    const problems = await Problem.find({
      difficulty: { $regex: `^${normalizedDifficulty}$`, $options: "i" },
    }).select("title difficulty tags companies");

    // Step-6: Return matching problems / Even if Empty
    res.status(200).json({
      success: true,
      data: problems,
      error: null,
      message:
        problems.length === 0
          ? "No matching problems found."
          : "Problems retrieved successfully.",
    });
  } catch (error) {
    // Step-7: Handle unexpected server errors
    console.error("Error fetching problems by difficulty:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: "Internal server error" + error,
    });
  }
};

export const tagsProblem = async (req: Request, res: Response) => {
  // Step-1: Extract 'tags' from request body
  const { tag } = req.query;

  // Step-2: Validate that 'tags' is a non-empty array of strings
  if (!tag || typeof tag !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid input. 'tag' must be a non-empty string.",
      error: "Invalid 'tag' parameter.",
    });
    return;
  }

  try {
    // Step-3: Search for problems where any of the provided tags matches (case-insensitive)
    const questions = await Problem.find({
      tags: { $in: [new RegExp(tag, "i")] },
    }).select("title difficulty tags companies");

    // Step-4: Return matched problems
    res.status(200).json({
      success: true,
      data: questions,
      error: null,
      message:
        questions.length === 0
          ? "No matching problems found."
          : "Problems retrieved successfully by tags.",
    });
  } catch (error) {
    // Step-6: Handle server errors
    console.error("Error fetching problems by tags:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: "Internal server error" + error,
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
    // Step-1: Validate request body using Zod schema
    const parsed = problemSchema.safeParse(req.body);

    if (!parsed.success) {
      // Step-2: If validation fails, respond with 400 and errors
      res.status(400).json({
        success: false,
        data: null,
        error: parsed.error.flatten(),
      });
      return;
    }

    // Step-3: Add the authenticated admin's ID as the author of the problem
    const sanitizedData = {
      ...parsed.data,
      author: (req as CustomRequest).id || `6876674c1483f2d4377f5f98`,
    };

    // Step-4: Normalize title and description to perform case-insensitive duplicate check
    const { title, description } = sanitizedData;

    const normalizedTitle = title.trim().toLowerCase();
    const normalizedDescription = description.trim().toLowerCase();

    // Step-5: Check in the database if a problem with same title or description already exists
    const alreadyExists = await Problem.findOne({
      $or: [
        { title: new RegExp(`^${normalizedTitle}$`, "i") },
        { description: new RegExp(`^${normalizedDescription}$`, "i") },
      ],
    });

    if (alreadyExists) {
      // Step-6: If duplicate exists, respond with 409 Conflict
      res.status(409).json({
        success: false,
        data: null,
        error: "Problem with the same title or description already exists",
      });
      return;
    }

    // Step-7: Create the new problem in the database
    const newProblem = await Problem.create(sanitizedData);

    // Step-8: Respond with 201 Created and return the newly created problem
    res.status(201).json({
      success: true,
      data: newProblem,
      error: null,
    });
  } catch (error) {
    // Step-9: Handle any unexpected server errors
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
    // Step-1: Extract title from request body
    const { title } = req.body;

    // Step-2: Validate presence of title
    if (!title) {
      res.status(400).json({
        success: false,
        data: null,
        error: "Problem title is required",
      });
      return;
    }

    // Step-3: Get logged-in user ID from custom request
    const loggedInUserId = (req as CustomRequest).id;

    // Step-4: Verify user exists
    const user = await User.findById(loggedInUserId);
    if (!user) {
      res.status(404).json({
        success: false,
        data: null,
        error: "User not found",
      });
      return;
    }

    // Step-5: Check if problem exists by title
    const problem = await Problem.findOne({ title });
    if (!problem) {
      res.status(404).json({
        success: false,
        data: null,
        error: "Problem not found",
      });
      return;
    }

    // Step-6: Verify the logged-in user is the author of the problem
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

    // Step-7: Delete the problem
    await Problem.deleteOne({ _id: problem._id });

    // Step-8: Send success response
    res.status(200).json({
      success: true,
      data: `Problem titled '${title}' has been deleted successfully.`,
      error: null,
    });
  } catch (error) {
    // Step-9: Handle server-side error
    console.error("Error deleting problem:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error",
    });
  }
};

export const CreateStarterCode = async (req: Request, res: Response) => {
  // Step-1: Destructure starter codes from request body
  const { javaStarter, javaScriptStarter, pythonStarter } = req.body;

  // Step-2: Validate that all three starter codes are provided
  if (!javaScriptStarter || !javaStarter || !pythonStarter) {
    res.status(400).json({
      success: false,
      data: null,
      error: "All Languages Starter code is required.",
    });
    return;
  }

  try {
    // Step-3: Create the starter code document in the database
    const starter = await StarterCode.create({
      javaStarter,
      javaScriptStarter,
      pythonStarter,
    });

    // Step-4: Send success response
    res.status(201).json({
      success: true,
      data: starter,
      error: null,
    });
  } catch (error) {
    // Step-5: Handle internal server errors
    console.error("Error creating starter code:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error",
    });
  }
};

export const saveProblem = async (req: Request, res: Response) => {
  // extract the problemId
  const { problemId } = req.params;

  // if problemId is not provided.
  if (!problemId) {
    res.status(401).json({
      success: false,
      message: "Problem ID is not provided",
      error: "Problem Id is required.",
    });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    res.status(400).json({
      success: false,
      message: "Invalid Problem ID format",
      error: "Problem ID is not valid.",
    });
    return;
  }

  const questionId = new mongoose.Types.ObjectId(problemId);

  try {
    // if problem with the given questionId exists.
    const problem = await Problem.findById(questionId);

    if (!problem) {
      res.status(404).json({
        success: false,
        message: "Problem not found",
        error: "No such problem exists.",
      });
      return;
    }

    const user = await User.findById((req as CustomRequest).id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: "No such user exists.",
      });
      return;
    }

    const questionAlreadySaved = user.SavedProblem.some(
      (pId) => pId.toString() === questionId.toString()
    );

    if (questionAlreadySaved) {
      user.SavedProblem = user.SavedProblem.filter(
        (pId) => pId.toString() !== questionId.toString()
      );
    } else {
      user.SavedProblem.push(questionId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: questionAlreadySaved
        ? "Problem removed from saved list"
        : "Problem added to saved list",
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: "Server error occurred",
    });
  }
};

export const likeProblem = async (req: Request, res: Response) => {
  const { problemId } = req.params;

  if (!problemId) {
    res.status(401).json({
      success: false,
      message: "Problem ID is not provided",
      error: "Problem Id is required.",
    });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    res.status(400).json({
      success: false,
      message: "Invalid Problem ID format",
      error: "Problem ID is not valid.",
    });
    return;
  }

  const questionId = new mongoose.Types.ObjectId(problemId);

  try {
    const problem = await Problem.findById(questionId);

    if (!problem) {
      res.status(404).json({
        success: false,
        message: "Problem not found",
        error: "No such problem exists.",
      });
      return;
    }

    const user = await User.findById((req as CustomRequest).id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: "No such user exists.",
      });
      return;
    }

    const likedAlreadySaved = user.likedProblem.some(
      (pId) => pId.toString() === questionId.toString()
    );

    if (likedAlreadySaved) {
      user.likedProblem = user.likedProblem.filter(
        (pId) => pId.toString() !== questionId.toString()
      );
      // Decrease the like count
      problem.likeCount = Math.max(0, problem.likeCount - 1);
    } else {
      user.likedProblem.push(questionId);
      // Increase the like count
      problem.likeCount = problem.likeCount + 1;
    }

    await user.save();
    await problem.save();

    res.status(200).json({
      success: true,
      message: likedAlreadySaved
        ? "Problem removed from liked list"
        : "Problem added to liked list",
      error: null,
    });
  } catch (error: any) {}
};
