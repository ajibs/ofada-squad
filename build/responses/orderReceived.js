'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function orderReceived(slackData, userName) {
  return {
    responseUrl: slackData.response_url,
    text: `Got it :thumbsup: Generating your food *${userName}*
      Please carry on, I'll notify you when I'm done.`,
    mrkdwn: true,
    mrkdwn_in: ['text']
  };
}

exports.default = orderReceived;