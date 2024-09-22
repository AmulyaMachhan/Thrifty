import express from "express";
import { createRazorpayOrder } from "../controllers/razorpay.controller.js";

const router = express.Router();

router.route("/create-order").post(createRazorpayOrder);
export default router;
