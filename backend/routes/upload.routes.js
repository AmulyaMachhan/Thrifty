import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { imageUpload } from "../controllers/upload.controller";

const router = express.Router();

router.route("/upload").post(upload.single("image"), imageUpload);

export default router;
