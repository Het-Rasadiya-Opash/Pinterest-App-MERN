import express from "express";
import {
  createPin,
  getPin,
  getPins,
  interact,
  interactionCheck,
} from "../controllers/pin.controller.js";
import { tokenVerify } from "../middlewares/verifyToken.js";
const router = express.Router();

router.get("/", getPins);
router.get("/:id", getPin);
router.post("/", tokenVerify, createPin);

router.get("/interaction-check/:id", interactionCheck);
router.post("/interact/:id", tokenVerify, interact);

export default router;
