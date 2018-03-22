'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _postChatMessage = require('./postChatMessage');

var _postChatMessage2 = _interopRequireDefault(_postChatMessage);

var _orderReceived = require('../responses/orderReceived');

var _orderReceived2 = _interopRequireDefault(_orderReceived);

var _formatInputOrder = require('./formatInputOrder');

var _formatInputOrder2 = _interopRequireDefault(_formatInputOrder);

var _invalidOrder = require('../responses/invalidOrder');

var _invalidOrder2 = _interopRequireDefault(_invalidOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Food = require('../models/Food');

async function saveOrder(req, res) {
  const slackReqObj = JSON.parse(req.body.payload);
  const user = slackReqObj.user.name;

  try {
    if (slackReqObj.callback_id === 'user_order') {

      _winston2.default.info('Formatting user order to proper input');
      const formattedOrder = (0, _formatInputOrder2.default)(slackReqObj.submission.foodItems, user);

      if (formattedOrder.error) {
        _winston2.default.info('caught error');
        throw 'invalid order provided';
      }

      _winston2.default.info('Saving food order to database');
      await new Food(formattedOrder).save();

      (0, _postChatMessage2.default)((0, _orderReceived2.default)(slackReqObj, user));
      _winston2.default.info('Order saved and response sent to user');
    }
    return res.status(200).send();
  } catch (err) {
    _winston2.default.error(err);
    (0, _postChatMessage2.default)((0, _invalidOrder2.default)(slackReqObj, user));
    return res.status(200).send();
  }
}

exports.default = saveOrder;