import Razorpay from "razorpay";
import { asyncHandler } from "../utils/asyncHandler";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = asyncHandler(async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount) {
      return res
        .status(404)
        .json({ error: "No amount provided for the order" });
    }

    const options = {
      amount: amount * 100,
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
