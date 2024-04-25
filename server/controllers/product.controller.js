// controllers/productController.js
const Product = require('../models/product.js');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
        message: "All products retrieved successfully",
        products
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageURL: req.body.imageURL,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json({
        message: "Product has been created successfully",
        newProduct
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Implement other CRUD operations as needed

module.exports = {
  getAllProducts,
  createProduct,
};
