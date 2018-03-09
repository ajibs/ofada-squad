'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _findTodaysDate = require('../utilities/findTodaysDate');

var _findTodaysDate2 = _interopRequireDefault(_findTodaysDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Food = require('../models/Food');

async function totalPrice(req, res) {
  _winston2.default.info('find food orders from today');
  const todaysOrders = await Food.find({ created: (0, _findTodaysDate2.default)() });

  // loop through their priceOfOrder and sum
  _winston2.default.info('summing the price of all food orders');
  let sumOfAllOrders = 0;
  todaysOrders.forEach(order => {
    sumOfAllOrders += order.priceOfOrder;
  });

  res.json({ sumOfAllOrders });
}

exports.default = totalPrice;