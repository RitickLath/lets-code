import { Request, Response, Router } from "express";
import { ai } from "..";
import { userAuth } from "../middleware";

export const genAIRouter = Router();

// Will make the prompt more correct.
genAIRouter.post("/", userAuth, async (req: Request, res: Response) => {
  const { userDoubt, question } = req.body;

  if (!userDoubt) {
    res.status(400).json({
      success: false,
      message: "Please ask a doubt.",
      error: "Missing userDoubt",
    });
    return;
  }

  if (!question) {
    res.status(400).json({
      success: false,
      message: "Please send the question too.",
      error: "Missing question",
    });
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: `
            You are a Data Structures and Algorithms (DSA) expert.
            Provide concise/precise and helpful guidance to help solve the coding problem.
            Keep the explanation under 50 words if they ask for.
            Use JavaScript if a code example is needed.
            If the user's doubt is unrelated to the problem, respond with "NA" only.`,
      },
      contents: `User Doubt: ${userDoubt.trim()}\nProblem Statement: ${question}`,
    });

    const result = response.text?.trim();

    if (result?.toLowerCase() === "na") {
      res.json({
        message: `How can I help you with this problem?`,
      });
      return;
    }

    res.json({ message: result });
  } catch (error: any) {
    console.error("AI error:", error);
    res.status(500).json({
      success: false,
      message: "AI processing failed.",
      error: error.message || "Unknown error",
    });
  }
});
