import { Router } from "express";
import { getProfile, updateProfile } from "../controller";

export const profileRouter = Router();

profileRouter.get("/", getProfile);
profileRouter.put("/", updateProfile);
