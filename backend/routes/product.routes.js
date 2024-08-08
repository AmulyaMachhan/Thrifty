import express from "express";
import formidable from "express-formidable";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";
import {
  addProduct,
  addProductReview,
  fetchAllProducts,
  fetchNewProducts,
  fetchProductById,
  fetchProducts,
  fetchTopProducts,
  removeProduct,
  updateProductDetails,
} from "../controllers/product.controller.js";
import { checkId } from "../middlewares/checkId.middleware.js";

const router = express.Router();

// Static routes should be defined first
router.route("/allproducts").get(fetchAllProducts);
router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);

// Dynamic routes should be defined after static routes
router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

// Other routes
router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

export default router;
