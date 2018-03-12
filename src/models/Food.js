const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  foodItems: {
    type: [[String]],
    required: true,
  },
  foodType: {
    type: String,
    default: 'non-swallow',
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
  channelHook: String,
});

module.exports = mongoose.model('Food', foodSchema);
