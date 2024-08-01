import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//UTILS
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//Routes Import
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";

//Routes Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("SERVER RUNNING ON PORT :" + process.env.PORT);
});
