import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";
import { handleError } from "./middlewares/handdleError.js";

const server = express();
server.use(cookieParser());
server.use(json());
server.use(cors());
server.use(router);
server.use(handleError);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
