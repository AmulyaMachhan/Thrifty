import express from "express";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";
import { addProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, addProduct);

export default router;
