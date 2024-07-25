import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUser,
  getUserById,
  updateUserById,
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

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// Admin routes
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUser)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
