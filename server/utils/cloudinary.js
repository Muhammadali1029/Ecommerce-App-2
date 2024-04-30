const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
// });
cloudinary.config({
    cloud_name: "dipq6z7wa",
    api_key: 827247853749555,
    api_secret: "68V7s0jA_UaRGPjltoHr4rasNjs",
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
