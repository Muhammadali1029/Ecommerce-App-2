const Order = require('../models/orderModel.js');
const Joi = require('joi'); // Import Joi for validation

const createOrder = async (req, res) => {
  // Validate request body against Mongoose schema
  const { error } = validateOrder(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, phoneNumber, email, company, pickupDateTime, items, totalPrice } = req.body;

  try {
    const newOrder = new Order({
      name,
      phoneNumber,
      email,
      company,
      pickupDateTime,
      items,
      totalPrice
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', newOrder });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Validation function using Joi
const validateOrder = (order) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().allow('').optional(),
    company: Joi.string().allow('').optional(),
    pickupDateTime: Joi.date().required(),
    items: Joi.array().items({
      id: Joi.string().required(), // Define 'id' field here
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().integer().min(1).required(),
      image: Joi.string().uri().allow('').required(),
    }).required(),
    totalPrice: Joi.number().required(),
    status: Joi.string().valid('pending', 'processing', 'completed').default('pending')
  });

  return schema.validate(order);
};

module.exports = {
  createOrder,
  getAllOrders,
  deleteOrder,
};
