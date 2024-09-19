import express from "express";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";
import {
  countTotalOrders,
  createOrder,
  getAllOrders,
  getUserOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);

export default router;
