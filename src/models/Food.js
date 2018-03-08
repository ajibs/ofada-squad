const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  food_items: String,
  total_price: String,
  user: String,
});

module.exports = mongoose.model('Food', foodSchema);
