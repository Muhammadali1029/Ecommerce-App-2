// productRoutes.js

const router = require("express").Router();
const { parser } = require("../utils/cloudinary.js");
const { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/product.controller.js");

// Routes
router.post("/", parser.single("image"), createProduct);
router.patch("/:id", updateProduct); 
router.delete("/:id", deleteProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);

module.exports = router;
