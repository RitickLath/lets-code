import { Router } from "express";
import { registerUser, loginUser, getMe, logOut, profile } from "../controller";
import { userAuth } from "../middleware";

export const authRouter = Router();

authRouter.post("/register", registerUser); // register
authRouter.post("/login", loginUser); // login
authRouter.post("/logout", logOut);
authRouter.get("/me", getMe); // Protected route
authRouter.get("/profile", userAuth, profile);
