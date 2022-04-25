import { Router } from "express";
import authRouter from "../routes/authRouter.js";
import testsRouter from "./testsRouter.js";

const router = Router();

router.use(authRouter);
router.use(testsRouter);

export default router;
