import { Router } from "express";
import * as testsController from "../controllers/testsController.js";

const testsRouter = Router();

testsRouter.get("/tests", testsController.get);
testsRouter.put("/view/:id", testsController.view);
testsRouter.post("/tests", testsController.post);

export default testsRouter;
