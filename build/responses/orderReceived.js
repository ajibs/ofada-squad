'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function orderReceived(slackData, userName) {
  return {
    responseUrl: slackData.response_url,
    text: `Got it :thumbsup: *${userName}*`,
    mrkdwn: true,
    mrkdwn_in: ['text']
  };
}

exports.default = orderReceived;