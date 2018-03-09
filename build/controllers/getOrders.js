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

async function getOrders(req, res) {
  _winston2.default.info('Fetching food orders from DB');
  const orders = await Food.find({ created: (0, _findTodaysDate2.default)() });
  return res.json(orders);
}

exports.default = getOrders;