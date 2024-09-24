import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);

  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

export const createOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ error: "No order items" });
    }

    const itemsFromDB = await Product.find({
      _id: {
        $in: orderItems.map((x) => x._id),
      },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        return res
          .status(400)
          .json({ error: `Product not found : ${itemFromClient._id}` });
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    return res.status(200).json(createdOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error while ordering the product" });
  }
});

export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");

    return res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error while finding all order details",
    });
  }
});

export const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    return res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error while finding the user order details",
    });
  }
});

export const countTotalOrders = asyncHandler(async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    return res.status(200).json(totalOrders);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error while finding the user order details",
    });
  }
});

export const calculateTotalSales = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({});

    const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    return res.status(200).json(totalSales);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error while finding the user order details",
    });
  }
});

export const calculateTotalSalesByDate = asyncHandler(async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    return res.status(200).json(salesByDate);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error while finding the user order details",
    });
  }
});

export const findOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error while finding order details" });
  }
});

export const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    const { id, status, update_time, payer } = req.body;
    order.paymentResult = {
      id,
      status,
      update_time,
      email_address: payer.email,
    };

    const updatedOrder = await order.save();

    return res.status(200).json(updatedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error while order payment" });
  }
});

export const markOrderAsDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    return res.status(200).json(updatedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error while order delivery" });
  }
});
