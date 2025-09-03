const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  change: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Price', priceSchema);
