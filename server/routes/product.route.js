const { getAllProducts, createProduct, getProduct } = require("../controllers/product.controller.js");

const router = require("express").Router();


router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);



module.exports = router;