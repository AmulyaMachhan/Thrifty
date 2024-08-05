import express from "express";
import formidable from "express-formidable";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";
import {
  addProduct,
  fetchAllProducts,
  fetchProductById,
  fetchProducts,
  removeProduct,
  updateProductDetails,
} from "../controllers/product.controller.js";

const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);
router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

router.route("/allproducts").get(fetchAllProducts);

export default router;
