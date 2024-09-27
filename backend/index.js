import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

//UTILS
import connectDB from "./src/config/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "https://thrifty-qqkh.vercel.app", // Live frontend
  "http://localhost:5173", // Development frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"));
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.static(path.join(path.resolve() + "public")));

//Routes Import
import userRouter from "./src/routes/user.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import productRouter from "./src/routes/product.routes.js";
import orderRouter from "./src/routes/order.routes.js";
import razorpayRouter from "./src/routes/razorpay.routes.js";

//Routes Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/razorpay", razorpayRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`SERVER SUCCESSFULLY RUNNING ON PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGO DB CONNECTION ERROR ${error}`);
  });
