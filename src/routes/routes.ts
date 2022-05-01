import { Router } from "express";
import authRouter from "../routes/authRouter.js";
import testsRouter from "./testsRouter.js";
import categoryRouter from "./categoryRouter.js";
import disciplineRouter from "./disciplineRouter.js";
import teacherRouter from "./teacherRouter.js";

const router = Router();

router.use(authRouter);
router.use(testsRouter);
router.use(categoryRouter);
router.use(disciplineRouter);
router.use(teacherRouter);

export default router;
