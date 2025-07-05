import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controller";

export const authRouter = Router();

authRouter.post("/register", registerUser); // register
authRouter.post("/login", loginUser); // login
authRouter.get("/me", getMe); // Protected route
