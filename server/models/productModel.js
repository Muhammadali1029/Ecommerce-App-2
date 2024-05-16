const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productCode: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true, enum: ['light', 'ceiling'] }, // Add enum for categories
  stock: { type: Number, required: true },
  specsLight: {
    material: { type: String, required: function() { return this.category === 'light'; } }, // Make specs required for light category
    inputVoltage: { type: String, required: function() { return this.category === 'light'; } },
    wattage: { type: String, required: function() { return this.category === 'light'; } },
    lumen: { type: String, required: function() { return this.category === 'light'; } },
    colourTemperature: { type: String, required: function() { return this.category === 'light'; } },
    IPRating: { type: String, required: function() { return this.category === 'light'; } },
    beamAngle: { type: Number, required: function() { return this.category === 'light'; } },
    dimension: { type: String, required: function() { return this.category === 'light'; } },
    workingTemperature: { type: String, required: function() { return this.category === 'light'; } },
    warranty: { type: Number, required: function() { return this.category === 'light'; } }
  },
  specsCeiling: {
    material: { type: String, required: function() { return this.category === 'ceiling'; } },
    size: { type: String, required: function() { return this.category === 'ceiling'; } },
    colour: { type: String, required: function() { return this.category === 'ceiling'; } },
    thickness: { type: String, required: function() { return this.category === 'ceiling'; } }
  }
});

module.exports = mongoose.model('Product', productSchema);
