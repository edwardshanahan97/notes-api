import express from "express";
import {
  register,
  login,
  getCurrentUser,
  logout,
} from "../controllers/auth.js";
import requireAuth from "../middleware/requireAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/me", requireAuth, getCurrentUser);

authRouter.post("/logout", requireAuth, logout);

export default authRouter;
