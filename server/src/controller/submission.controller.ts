import axios from "axios";
import fs from "fs";
import { Request, Response } from "express";
import path from "path";
import { Submission } from "../model";
import { fail } from "assert";

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
    res.status(400).json({ error: "Unsupported language" });
    return;
  }

  let serverCode;
  try {
    // Will correct this hardocoded value.
    const pathis = path.resolve(
      __dirname,
      `../judge-runners/${function_name}/runner.js`
    );
    serverCode = fs.readFileSync(pathis, "utf8");
  } catch (error) {
    res.status(400).json({ data: "Function Signature changed by user." });
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

    // Find the status of Solution
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
      status = "Runtime Error"; // or "Compilation Error" if you add it to enum
    } else if (stderr) {
      status = "Runtime Error";
    } else if (stdout && stdout.includes("Failed")) {
      status = "Wrong Answer";
    } else if (stdout) {
      status = "Accepted";
    } else {
      status = "Runtime Error";
    }

    // total pass and total fails.
    let resultArr;
    let failed = 0;
    let passed = 0;
    if (status == "Wrong Answer" || status == "Accepted") {
      resultArr = stdout.split("\n");
      const passedArray = resultArr.filter((item: string) =>
        item.includes("Passed")
      );
      const failedArray = resultArr.filter((item: string) =>
        item.includes("Failed")
      );

      passed = passedArray.length;
      failed = failedArray.length;
    }

    //Add submission
    const submission = await Submission.create({
      user: (req as CustomRequest)?.id || "6876674c1483f2d4377f5f98",
      problemId,
      language,
      status,
      executionTime: response.data.time,
      memoryUsed: memory,
    });

    res.status(200).json({
      status,
      executionTime: time,
      memoryUsed: memory,
      passed,
      failed,
      stderr,
    });
  } catch (e: any) {
    console.error("Judge0 API Error:", e.response?.data || e.message);
    res.status(500).json({ error: "Judge0 request failed" });
  }
};

export const getAllSubmissions = (req: Request, res: Response) => {
  res.send("Get all submissions");
};

export const getSubmissionById = (req: Request, res: Response) => {
  res.send("Get submission by ID");
};
