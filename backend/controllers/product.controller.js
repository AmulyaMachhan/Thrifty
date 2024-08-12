import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, brand, description, quantity, price, category, image } =
    req.fields;

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
    case !image:
      return res.status(400).json({ error: "Image is required" });
  }

  try {
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ error: "Product already exists!!" });
    }

    const product = await new Product({ ...req.fields });
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

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
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
      .limit(12)
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
    //Extract rating and comment from request body
    const { rating, comment } = req.body;

    //Validate rating and comment
    if (!rating && !comment) {
      return res.status(400).json({ message: "Rating and comment required" });
    }

    //Find product based on the product id in the request parameters
    const product = await Product.findById(req.params.id);

    //Validate the product
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    //Check if the user has already reviewed the product
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    //Throw an error if already reviewed by the user
    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product Already Reviewed" });
    }

    //Create a new review according to the review schema
    const review = {
      name: req.user.username,
      rating,
      comment,
      user: req.user._id,
    };

    //Push the review into the product collection
    product.reviews.push(review);
    //Put the number of review of the product
    product.numReviews = product.reviews.length;
    //Calculate and embed the product rating
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    //Save the product collection
    await product.save();

    //Return the response
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
    const products = await Product.find({}).sort({ _id: -1 }).limit(4);

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
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
