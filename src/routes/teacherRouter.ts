import { Router } from "express";
import * as teacherController from "../controllers/teacherController.js";

const teacherRouter = Router();
teacherRouter.get("/teachers/:id", teacherController.findByDisciplineId);

export default teacherRouter;
