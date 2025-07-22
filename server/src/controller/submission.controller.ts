import axios from "axios";
import fs from "fs";
import { Request, Response } from "express";

export const createSubmission = async (req: Request, res: Response) => {
  const {
    source_code,
    function_name,
  }: { source_code: string; function_name: string } = req.body;

  let serverCode;
  try {
    // Will correct this hardocoded value.
    serverCode = fs.readFileSync(
      `C:/Users/DELL/OneDrive/Desktop/lets-code/server/src/solutions/${function_name.toLowerCase()}/runner.js`,
      "utf8"
    );
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
        language_id: 63,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.RAPID_API_HOST,
        },
      }
    );

    res.status(200).json({ data: response.data });
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
