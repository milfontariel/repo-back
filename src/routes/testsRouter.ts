import { Router } from "express";
import * as testsController from "../controllers/testsController.js";

const testsRouter = Router();

testsRouter.get("/get", testsController.get);

export default testsRouter;
