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
  filterProducts,
  removeProduct,
  updateProductDetails,
  updateProductImage,
} from "../controllers/product.controller.js";
import { checkId } from "../middlewares/checkId.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

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

router
  .route("/:id/image")
  .put(
    authenticate,
    authorizeAdmin,
    upload.single("image"),
    updateProductImage
  );

// Other routes
router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, upload.single("image"), addProduct);

router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.route("/filtered-products").post(filterProducts);
export default router;
