import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers,
  getCurrentUserProfile,
} from "../controllers/user.controller.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(registerUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutUser);

router.route("/profile").get(authenticate, getCurrentUserProfile);

export default router;
