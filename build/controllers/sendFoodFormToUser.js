'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _inputOrderForm = require('../responses/inputOrderForm');

var _inputOrderForm2 = _interopRequireDefault(_inputOrderForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sendFoodFormToUser(req, res) {
  try {
    _winston2.default.info('Slash command received from a slack user');
    _winston2.default.info('Sending input form to user');

    _request2.default.post({
      url: process.env.DIALOG,
      headers: {
        Authorization: process.env.TOKEN
      },
      body: (0, _inputOrderForm2.default)(req.body),
      json: true
    }, (err, resp, body) => {
      if (body.ok === true) {
        return res.status(200).send();
      }
      throw err;
    });
  } catch (err) {
    _winston2.default.error(err);
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
}

exports.default = sendFoodFormToUser;