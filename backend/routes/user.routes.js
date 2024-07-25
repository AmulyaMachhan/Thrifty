import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);

export default router;
