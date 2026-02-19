import express from "express";
import {
  addComment,
  getPostComments,
} from "../controllers/comment.controller.js";
import { tokenVerify } from "../middlewares/verifyToken.js";
const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/", tokenVerify, addComment);

export default router;
