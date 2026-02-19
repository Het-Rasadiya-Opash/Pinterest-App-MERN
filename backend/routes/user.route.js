import express from "express";
import {
  followUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { tokenVerify } from "../middlewares/verifyToken.js";
const router = express.Router();

router.get("/:username", getUser);
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);
router.post("/follow/:username", tokenVerify, followUser);

export default router;
