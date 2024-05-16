const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // No need to explicitly define the 'id' field here
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    company: { type: String, required: false },
    pickupDateTime: { type: Date, required: true },
    items: [
      {
        id: { type: String, required: true }, // Define 'id' field here
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: false }
      }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'PROCESSING', 'COMPLETED'], default: 'PENDING' }
});

module.exports = mongoose.model('Order', orderSchema);
