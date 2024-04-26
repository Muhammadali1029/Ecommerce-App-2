const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerDetails: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    company: { type: String },
  },
  pickupDate: { type: Date },
  totalPrice: { type: Number, required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  status: { type: String, enum: ['pending', 'processing', 'completed'], default: 'pending' }
});

module.exports = mongoose.model('Order', orderSchema);
