import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, brand, description, quantity, price, category } = req.body;

  const imageLocalPath = req.file.path;

  switch (true) {
    case !name:
      return res.status(400).json({ error: "Name is required" });
    case !brand:
      return res.status(400).json({ error: "Brand is required" });
    case !description:
      return res.status(400).json({ error: "Desription is required" });
    case !quantity:
      return res.status(400).json({ error: "Quantity is required" });
    case !price:
      return res.status(400).json({ error: "Price is required" });
    case !category:
      return res.status(400).json({ error: "Category is required" });
    case !imageLocalPath:
      return res.status(400).json({ error: "Image is required" });
  }
  const image = await uploadOnCloudinary(imageLocalPath);

  try {
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ error: "Product already exists!!" });
    }

    const product = await new Product({
      name,
      brand,
      description,
      quantity,
      price,
      category,
      image: image.url,
    });

    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error while creating the product" });
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  const { name, brand, description, quantity, price, category } = req.fields;

  switch (true) {
    case !name:
      return res.status(400).json({ error: "Name is required" });
    case !brand:
      return res.status(400).json({ error: "Brand is required" });
    case !description:
      return res.status(400).json({ error: "Desription is required" });
    case !quantity:
      return res.status(400).json({ error: "Quantity is required" });
    case !price:
      return res.status(400).json({ error: "Price is required" });
    case !category:
      return res.status(400).json({ error: "Category is required" });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    return res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: error || "Error while updating the product" });
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ ...product, message: "Product Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error while Deleting the product" });
  }
});

const updateProductImage = asyncHandler(async (req, res) => {
  try {
    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
      return res
        .status(500)
        .json({ error: "Error while uploading image to Cloudinary" });
    }

    const product = await Product.findById(req.params?.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const oldImageURL = product.image;
    const publicID = oldImageURL.split("/").pop().split(".")[0];

    try {
      await deleteFromCloudinary(publicID);
    } catch (err) {
      console.error("Error deleting image from Cloudinary:", err);
    }

    product.image = image.secure_url;
    await product.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json({ image, message: "Image Uploaded Successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message || "Error while updating image" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 16;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return res.status(200).json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      hasMore: page < Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message || "Error while fetching products" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message || "Error while fetching the product" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ _id: -1 });

    if (!products) {
      return res.status(404).json({ message: "Products Not Found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message || "Error while fetching all products" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating && !comment) {
      return res.status(400).json({ message: "Rating and comment required" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ error: "Product Already Reviewed" });
    }

    const review = {
      name: req.user.username,
      rating,
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(200).json({ message: "Review Added" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Error while adding product review" });
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Error while Fetching Top Products" });
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(10);

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Error while Fetching New Products" });
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    const args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while Filtering Products" });
  }
});

export {
  addProduct,
  updateProductDetails,
  updateProductImage,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
