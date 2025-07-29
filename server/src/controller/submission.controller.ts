import axios from "axios";
import fs from "fs";
import { Request, Response } from "express";
import path from "path";
import { Submission } from "../model";

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

  const languageMap: Record<string, number> = {
    Java: 62,
    Javascript: 63,
    Python: 71,
  };

  const languageId = languageMap[language];
  if (!languageId) {
    res.status(400).json({
      success: false,
      data: null,
      error: "Unsupported language",
    });
    return;
  }

  let serverCode;
  try {
    const pathis = path.resolve(
      __dirname,
      `../judge-runners/${function_name}/runner.js`
    );
    serverCode = fs.readFileSync(pathis, "utf8");
  } catch (error) {
    res.status(400).json({
      success: false,
      data: null,
      error: "Function Signature changed by user.",
    });
    return;
  }

  const sendCode = `
  ${source_code}

  ${serverCode}
  `;

  try {
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

    const {
      stdout,
      stderr,
      compile_output,
      time,
      memory,
      status: judgeStatus,
    } = response.data;

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

    await Submission.create({
      user: (req as CustomRequest)?.id || "6876674c1483f2d4377f5f98",
      problemId,
      language,
      status,
      executionTime: time,
      memoryUsed: memory,
    });

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
