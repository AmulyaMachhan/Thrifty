import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { imageUpload } from "../controllers/upload.controller.js";

const router = express.Router();

router.route("/").post(upload.single("image"), imageUpload);

export default router;
