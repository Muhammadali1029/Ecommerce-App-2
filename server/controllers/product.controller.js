// controllers/productController.js
const Product = require('../models/productModel.js');

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

const getProduct = async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      res.status(200).json({
          product,
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          error: error.message,
      });
  }
};

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

// Implement other CRUD operations as needed

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
};
