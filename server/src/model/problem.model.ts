import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema();

export const Problem = mongoose.model("Problem", ProblemSchema);
