import { Router } from "express";
import { registerUser, loginUser, getMe, logOut, logOut } from "../controller";

export const authRouter = Router();

authRouter.post("/register", registerUser); // register
authRouter.post("/login", loginUser); // login
authRouter.post("/logout", logOut);
authRouter.get("/me", getMe); // Protected route
