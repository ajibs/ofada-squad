'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postChatMessage = message => new Promise((resolve, reject) => {
  const {
    responseUrl,
    channel = null,
    text = null,
    replaceOriginal = null
  } = message;

  const payload = {
    response_type: 'in_channel'
  };

  if (channel !== null) payload.channel = channel;
  if (text !== null) payload.text = text;
  if (replaceOriginal !== null) payload.replace_original = replaceOriginal;

  // const responseUrl = '';

  _request2.default.post({
    url: responseUrl,
    body: payload,
    json: true
  }, (err, response, body) => {
    if (err) {
      reject(err);
    } else if (response.statusCode !== 200) {
      reject(body);
    } else if (body.ok !== true) {
      const bodyString = JSON.stringify(body);
      reject(new Error(`Got non ok response while posting chat message. Body -> ${bodyString}`));
    } else {
      resolve(body);
    }
  });
});

exports.default = postChatMessage;