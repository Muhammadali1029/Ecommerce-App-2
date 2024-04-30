const { getAllProducts, createProduct, getProduct } = require("../controllers/product.controller.js");
const { parser } = require("../utils/cloudinary.js");

const router = require("express").Router();


router.post("/", parser.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);



module.exports = router;