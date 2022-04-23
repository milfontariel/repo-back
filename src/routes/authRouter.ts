import { Router } from "express";
import * as authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/", authController.singIn);
authRouter.post("/signup", authController.signUp);

export default authRouter;
