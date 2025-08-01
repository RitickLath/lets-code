import axios from "axios";
import fs from "fs";
import { Request, Response } from "express";
import path from "path";
import { Submission, User } from "../model";

interface CustomRequest extends Request {
  id?: string;
  role?: "User" | "Admin";
}

export const createSubmission = async (req: Request, res: Response) => {
  const {
    source_code,
    function_name,
    problemId,
    language = "Javascript",
  }: {
    source_code: string;
    function_name: string;
    problemId: string;
    language: "Java" | "Javascript" | "Python";
  } = req.body;

  // Map programming languages to Judge0 language IDs (for future use)
  const languageMap: Record<string, number> = {
    Java: 62,
    Javascript: 63,
    Python: 71,
  };
  // Get the corresponding language ID
  const languageId = languageMap[language];

  // Return error if language is not supported
  if (!languageId) {
    res.status(400).json({
      success: false,
      data: null,
      error: "Unsupported language",
    });
    return;
  }

  // Load server-side runner/test code for the specific function
  let serverCode;
  try {
    const pathis = path.resolve(
      __dirname,
      `../judge-runners/${function_name}/runner.js`
    );
    serverCode = fs.readFileSync(pathis, "utf8");
  } catch (error) {
    // If file is not found or path is incorrect, likely due to function signature change
    res.status(400).json({
      success: false,
      data: null,
      error: "Function Signature changed by user.",
    });
    return;
  }

  // Combine user code with the server-side test code
  const sendCode = `
  ${source_code}

  ${serverCode}
  `;

  try {
    // Submit code to Judge0 API for execution
    const response = await axios.post(
      `https://${process.env.RAPID_API_HOST}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: sendCode,
        language_id: languageId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.RAPID_API_HOST,
        },
      }
    );

    // Extract relevant execution results from Judge0 response
    const {
      stdout,
      stderr,
      compile_output,
      time,
      memory,
      status: judgeStatus,
    } = response.data;

    // Determine final status based on Judge0 response
    let status;

    if (judgeStatus?.description === "Time Limit Exceeded") {
      status = "Time Limit Exceeded";
    } else if (compile_output) {
      status = "Runtime Error";
    } else if (stderr) {
      status = "Runtime Error";
    } else if (stdout && stdout.includes("Failed")) {
      status = "Wrong Answer";
    } else if (stdout) {
      status = "Accepted";
    } else {
      status = "Runtime Error";
    }

    // Determine final status based on Judge0 response
    let passed = 0;
    let failed = 0;
    if (status === "Wrong Answer" || status === "Accepted") {
      const resultArr = stdout.split("\n");
      passed = resultArr.filter((item: string) =>
        item.includes("Passed")
      ).length;
      failed = resultArr.filter((item: string) =>
        item.includes("Failed")
      ).length;
    }

    // Save the submission record in the database
    await Submission.create({
      user: (req as CustomRequest)?.id || "6876674c1483f2d4377f5f98",
      problemId,
      language,
      status,
      executionTime: time,
      memoryUsed: memory,
    });

    // If all test cases passed and not already solved by the user, update their solved count
    if (failed == 0 && passed > 0) {
      // check if the question is already solved by user earlier.
      const alreadySolved = await Submission.findOne({
        user: (req as CustomRequest).id,
        problemId,
        status: "Accepted",
      });

      if (!alreadySolved) {
        // If not solved before, increment the user's `problemSolved` count
        const user = await User.findById((req as CustomRequest).id).select(
          "problemSolved"
        );
        if (!user) {
          res.status(404).json({
            success: false,
            data: null,
            error: "User not found",
          });
          return;
        }

        user.problemSolved = (user?.problemSolved || 0) + 1;

        await user?.save();
      }
    }
    // Send final response back to the client
    res.status(200).json({
      success: true,
      data: {
        status,
        executionTime: time,
        memoryUsed: memory,
        passed,
        failed,
        stderr,
      },
      error: null,
    });
  } catch (e: any) {
    // Log and return API failure
    console.error("Judge0 API Error:", e.response?.data || e.message);
    res.status(500).json({
      success: false,
      data: null,
      error: "Judge0 request failed",
    });
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  const { id: problemId } = req.params;
  const page: number = parseInt(req.query.page as string) || 0;
  const userId = (req as CustomRequest).id;

  if (!problemId) {
    res.status(400).json({
      success: false,
      data: null,
      error: "ProblemId is required.",
    });
    return;
  }

  try {
    const submissions = await Submission.find({
      user: userId,
      problemId,
    })
      .select("language status executionTime memoryUsed createdAt")
      .sort({ createdAt: -1 })
      .skip(page * 15)
      .limit(15);

    res.status(200).json({
      success: true,
      data: submissions,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Failed to fetch submissions.",
    });
  }
};

// get all solution irrespective of problem
export const getAllSubmissions = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string) || 0;
  const userId = (req as CustomRequest).id;

  try {
    const submissions = await Submission.find({ user: userId })
      .select("language status executionTime memoryUsed createdAt problemId")
      .populate({
        path: "problemId",
        select: "title difficulty",
      })
      .sort({ createdAt: -1 })
      .skip(page * 15)
      .limit(15);

    res.status(200).json({
      success: true,
      data: submissions,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: "Failed to fetch submissions.",
    });
  }
};

