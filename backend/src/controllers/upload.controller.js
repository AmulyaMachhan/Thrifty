import { asyncHandler } from "../utils/asyncHandler.js";

const imageUpload = asyncHandler(async (req, res) => {
  const image = req.file;

  if (!image) {
    return res.status(404).json({ error: "Image not Found" });
  }

  return res.status(200).json({
    message: "Image Uploaded Successfully",
    image: `/uploads/${req.file.filename}`,
  });
});

export { imageUpload };
