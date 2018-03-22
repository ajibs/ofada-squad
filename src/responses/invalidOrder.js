function invalidOrder(slackData, userName) {
  return {
    responseUrl: slackData.response_url,
    text: `You made a mistake *${userName}*,\n
    please enter the price not quantity of an item\n
    i.e. *egg - 50* not *egg - 1*
    `,
    mrkdwn: true,
    mrkdwn_in: ['text'],
  };
}

export default invalidOrder;
