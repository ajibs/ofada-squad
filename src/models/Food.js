const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  foodItems: {
    type: [String],
    required: true,
  },
  priceOfOrder: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  created: String,
});

module.exports = mongoose.model('Food', foodSchema);
