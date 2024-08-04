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

export { addProduct };
