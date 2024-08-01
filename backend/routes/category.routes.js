import express from "express";
import { createCategory } from "../controllers/category.controller.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory);

export default router;
