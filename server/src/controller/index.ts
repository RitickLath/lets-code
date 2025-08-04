export { registerUser, loginUser, getMe, logOut } from "./auth.controller";

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
  getLikeSave,
} from "./problem.controller";

export {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
} from "./submission.controller";

export { updateProfile, getProfile } from "./profile.controller";
