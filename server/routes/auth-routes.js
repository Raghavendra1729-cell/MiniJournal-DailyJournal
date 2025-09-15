import express from "express";
import { register, login, logout, getProfile } from "../contollers/auth-controllers.js";
import { authenticateToken } from "../middleware/auth.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/profile", authenticateToken, getProfile);

export default authRouter;