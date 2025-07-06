import z from "zod";
import mongoose from "mongoose";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .trim(),

  email: z.string().email("Invalid email format").trim(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]+$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  role: z.enum(["Admin", "User"]).optional(),
});

// Reusable ObjectId validator
const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

// Reusable ITestCase Zod Schema
const testCaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  output: z.string().min(1, "Output is required"),
});

// Main Problem Zod Schema
export const problemSchema = z.object({
  title: z.string().trim().min(1, "Problem title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    required_error: "Difficulty level is required",
  }),
  tags: z.array(z.string()).optional(),
  testcase: z.array(testCaseSchema).min(1, "At least one testcase is required"),
  hiddenTestcase: z.array(testCaseSchema).optional(),
  starterCode: objectIdSchema,
  constraints: z.string().optional(),
  author: objectIdSchema,
  discussions: objectIdSchema.optional(),
  likeCount: z.number().int().nonnegative().optional(),
  dislikeCount: z.number().int().nonnegative().optional(),
  hint: z.array(z.string()).optional(),
  companies: z.array(z.string()).optional(),
});
