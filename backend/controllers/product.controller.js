import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, brand, description, quantity, price, category } = req.fields;

  switch (true) {
    case !name:
      return res.status(401).res.json({ message: "Name is required" });
    case !brand:
      return res.status(401).res.json({ message: "Brand is required" });
    case !description:
      return res.status(401).res.json({ message: "Desription is required" });
    case !quantity:
      return res.status(401).res.json({ message: "Quantity is required" });
    case !price:
      return res.status(401).res.json({ message: "Price is required" });
    case !category:
      return res.status(401).res.json({ message: "Category is required" });
  }

  try {
    const product = new Product({ ...req.fields });
    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error while creating the product" });
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  const { name, brand, description, quantity, price, category } = req.fields;

  switch (true) {
    case !name:
      return res.status(401).res.json({ message: "Name is required" });
    case !brand:
      return res.status(401).res.json({ message: "Brand is required" });
    case !description:
      return res.status(401).res.json({ message: "Desription is required" });
    case !quantity:
      return res.status(401).res.json({ message: "Quantity is required" });
    case !price:
      return res.status(401).res.json({ message: "Price is required" });
    case !category:
      return res.status(401).res.json({ message: "Category is required" });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error while updating the product" });
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error while Deleting the product" });
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

    return res.status(200).res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      hasMore: page < Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching products" });
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
    res.status(500).json({ error: "Error while fetching the product" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    if (!products) {
      return res.status(404).json({ message: "Products Not Found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching all products" });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
};
