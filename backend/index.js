import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//UTILS
import connectDB from "./src/config/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  "/uploads",
  express.static(path.join(path.resolve(), "public/uploads"))
);

//Routes Import
import userRouter from "./src/routes/user.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import productRouter from "./src/routes/product.routes.js";
import uploadRouter from "./src/routes/upload.routes.js";

//Routes Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/uploads", uploadRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`SERVER SUCCESSFULLY RUNNING ON PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGO DB CONNECTION ERROR ${error}`);
  });
