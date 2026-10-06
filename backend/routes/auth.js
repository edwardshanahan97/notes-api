import express from "express";
import { register, login, getCurrentUser } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/register", register);

authRouter.post("/login", login);

authRouter.get("/me", getCurrentUser);

export default authRouter;
