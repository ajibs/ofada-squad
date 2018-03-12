function orderReceived(slackData, userName) {
  return {
    responseUrl: process.env.CHANNEL_HOOK || slackData.response_url,
    text: `Got it :thumbsup: *${userName}*`,
    mrkdwn: true,
    mrkdwn_in: ['text'],
  };
}

export default orderReceived;
