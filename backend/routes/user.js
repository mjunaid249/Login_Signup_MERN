import express from "express";
import { getInfo, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/info", isAuthenticated, getInfo);
router.get("/logout", logout);

export { router as userRouter };
