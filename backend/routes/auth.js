import express from "express";
import { register, login } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/register", register);

authRouter.post("/login", login);

export default authRouter;
