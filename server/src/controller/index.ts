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
} from "./problem.controller";

export {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
} from "./submission.controller";

export { updateProfile, getProfile } from "./profile.controller";
