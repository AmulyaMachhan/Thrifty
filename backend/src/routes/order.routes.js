import express from "express";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";
import { createOrder, getAllOrders } from "../controllers/order.controller.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);
export default router;
