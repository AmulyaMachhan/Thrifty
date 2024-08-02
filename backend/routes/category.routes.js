import express from "express";
import {
  createCategory,
  removeCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router
  .route("/:categoryID")
  .put(authenticate, authorizeAdmin, updateCategory)
  .delete(authenticate, authorizeAdmin, removeCategory);

export default router;
