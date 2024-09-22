import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayOrder,
} from "../controllers/razorpay.controller.js";

const router = express.Router();

router.route("/create-order").post(createRazorpayOrder);
router.route("/verify-order").post(verifyRazorpayOrder);

export default router;
