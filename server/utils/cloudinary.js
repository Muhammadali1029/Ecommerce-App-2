const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");

dotenv.config();

// Configure Cloudinary using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "wholesaled-ecommerce-app",
        resource_type: "image",
        public_id: (req, file) => `${Date.now()}_${file.originalname}`, // Example: timestamp + original filename
    },
});

const parser = multer({ storage: storage });

module.exports = {
    cloudinary,
    parser,
};
