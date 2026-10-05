import express from "express";
import { register } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/register", register);

export default authRouter;
