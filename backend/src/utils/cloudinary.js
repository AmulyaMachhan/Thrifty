import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //File has been successufully uploaded on cloudinary
    console.log(`File is uploaded on cloudinary ${response.url}`);

    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkErr) {
      console.error(`Error deleting local file: ${unlinkErr}`);
    }

    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath);

    console.log(`Cloudinary upload error ${err}`);

    return null;
  }
};

const deleteFromCloudinary = async (publicID) => {
  try {
    if (!publicID) {
      console.log("Given PublicID is invalid");
      return null;
    }

    const response = await cloudinary.uploader.destroy(publicID);

    return response;
  } catch (error) {
    console.log("Error in Deleting the file on cloudinary");
    throw error;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
