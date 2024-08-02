import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

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

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(401).json({ message: "Category name required" });
  }

  const { categoryID } = req.params;

  if (!categoryID) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const category = await Category.findById({ _id: categoryID });

  if (!category) {
    return res.status(404).json({ message: "Category does not exist" });
  }

  category.name = name;

  const updatedCategory = await category.save();

  if (!updatedCategory) {
    return res
      .status(500)
      .json({ message: "Category not updated in the database" });
  }

  return res.status(200).json(updatedCategory);
});

const removeCategory = asyncHandler(async (req, res) => {
  const { categoryID } = req.params;

  if (!categoryID) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    await Category.findByIdAndDelete(categoryID);

    res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error while deleting category" });
  }
});

export { createCategory, updateCategory, removeCategory };
