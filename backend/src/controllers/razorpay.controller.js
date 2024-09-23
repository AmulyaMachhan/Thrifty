import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = asyncHandler(async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res
        .status(404)
        .json({ error: "No amount provided for the order" });
    }

    const options = {
      amount: (amount * 100).toFixed(),
      currency,
      receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Could not create order",
    });
  }
});

export const verifyRazorpayOrder = asyncHandler(async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    switch (true) {
      case !razorpayOrderId:
        return res.status(404).json({ error: "Razorpay Order ID Required" });
      case !razorpayPaymentId:
        return res.status(404).json({ error: "Razorpay Payment ID Required" });
      case !razorpaySignature:
        return res.status(404).json({ error: "Razorpay Signature Required" });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpaySignature) {
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while Payment verification",
    });
  }
});
