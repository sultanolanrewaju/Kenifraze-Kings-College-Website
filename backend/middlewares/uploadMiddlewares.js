import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv/config";

// Configure Cloudinary with  credentials
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
})

// Set up storage and destination for the photo
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads", // Specify the folder in Cloudinary where files will be stored
        allowed_formats: ["jpg", "jpeg", "png", "webp","jfif"] // Specify allowed file formats
    }
});


// Export the multer middleware for handling file uploads
 const upload = multer({ storage: storage });
export default upload;
