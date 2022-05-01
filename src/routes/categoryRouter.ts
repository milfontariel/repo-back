import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";

const categoryRouter = Router();
categoryRouter.get("/categories/all", categoryController.findAll);

export default categoryRouter;
