import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  const name = req.body;

  if (!name) {
    return res.status(401).json({ message: "Undefined category" });
  }

  const existingName = await Category.findOne({ name });

  if (existingName) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const category = await new Category({ name }).save();

  if (!category) {
    return res
      .status(500)
      .json({ message: "Category not created in the database" });
  }

  return res.status(200).json(category);
});

export { createCategory };
