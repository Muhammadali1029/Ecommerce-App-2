const Product = require('../models/productModel.js');

const createProduct = async (req, res) => {
  try {
    console.log('Request body: ', req.body);
    // Extract data from the request body
    const { name, productCode, price, category, stock } = req.body;

    // Extract specs based on category
    let specs;
    if (category === 'light') {
      specs = req.body.specsLight;
    } else if (category === 'ceiling') {
      specs = req.body.specsCeiling;
    } else {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Create the new product
    const newProduct = await Product.create({
      name,
      productCode,
      price,
      image: req.file.path,
      category,
      stock,
      [category === 'light' ? 'specsLight' : 'specsCeiling']: specs // Assign specs based on category
    });

    res.status(201).json({
      message: 'Product has been created successfully',
      newProduct
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields
    for (const key in updates) {
      product[key] = updates[key];
    }

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json({
      message: 'Product updated successfully',
      updatedProduct
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    await product.remove();

    res.status(200).json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: 'All products retrieved successfully',
      products
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
