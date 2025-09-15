import express from "express";
import { register, login } from "../contollers/auth-controllers.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;