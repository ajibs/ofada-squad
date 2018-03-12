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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Food = require('../models/Food');

async function saveOrder(req, res) {
  try {
    const slackReqObj = JSON.parse(req.body.payload);

    if (slackReqObj.callback_id === 'user_order') {
      const user = slackReqObj.user.name;

      _winston2.default.info('Formatting user order to proper input');
      const formattedOrder = (0, _formatInputOrder2.default)(slackReqObj.submission.foodItems, user);

      _winston2.default.info('Get hook for channel');
      _winston2.default.info(slackReqObj.response_url);
      res.json(slackReqObj.response_url);
      /*
      winston.info('Saving food order to database');
      await new Food(formattedOrder).save();
       postChatMessage(orderReceivedMessage(slackReqObj, user));
      winston.info('Order saved and response sent to user');
      */
    }
    return res.status(200).send();
  } catch (err) {
    _winston2.default.error(err);
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
}

exports.default = saveOrder;