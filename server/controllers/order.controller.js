const Order = require('../models/orderModel.js');

const createOrder = async (req, res) => {
  const { customerName, email, phoneNumber, company, pickupDateTime } = req.body;

  try {
    const newOrder = new Order({ customerName, email, phoneNumber, company, pickupDateTime });
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

module.exports = {
  createOrder,
  getAllOrders,
  deleteOrder,
};
