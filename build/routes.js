'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _saveOrder = require('./controllers/saveOrder');

var _saveOrder2 = _interopRequireDefault(_saveOrder);

var _sendFoodFormToUser = require('./controllers/sendFoodFormToUser');

var _sendFoodFormToUser2 = _interopRequireDefault(_sendFoodFormToUser);

var _getOrders = require('./controllers/getOrders');

var _getOrders2 = _interopRequireDefault(_getOrders);

var _showHome = require('./controllers/showHome');

var _showHome2 = _interopRequireDefault(_showHome);

var _totalPrice = require('./controllers/totalPrice');

var _totalPrice2 = _interopRequireDefault(_totalPrice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import testing from './controllers/testing';

const router = new _express2.default.Router();

router.get('/', _showHome2.default);

// router.post('/test', testing);

// food order dialog form
router.post('/slack/command/food', _sendFoodFormToUser2.default);

// save to database and respond to user
router.post('/slack/actions', _saveOrder2.default);

// retrieve today's orders
router.get('/food/today/orders', _getOrders2.default);

router.get('/food/today/total-price', _totalPrice2.default);

exports.default = router;