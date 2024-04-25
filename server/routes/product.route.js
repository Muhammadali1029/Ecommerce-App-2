const { getAllProducts, createProduct } = require("../controllers/product.controller.js");

const router = require("express").Router();


router.get("/", getAllProducts);
router.post("/", createProduct);


module.exports = router;