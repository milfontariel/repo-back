import { Router } from "express";
import * as authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signin", authController.singIn);
authRouter.post("/signup", authController.signUp);
authRouter.get("/logout", authController.logOut);

export default authRouter;
