export { registerUser, loginUser, getMe } from "./auth.controller";

export {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
  getDiscussionByProblemId,
  addCommentToDiscussion,
  difficultyProblem,
  tagsProblem,
  searchProblem,
  CreateStarterCode,
  saveProblem,
  likeProblem,
} from "./problem.controller";

export {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
} from "./submission.controller";

export { updateProfile, getProfile } from "./profile.controller";
