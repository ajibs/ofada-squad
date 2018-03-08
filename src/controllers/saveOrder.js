import winston from 'winston';
import postChatMessage from './postChatMessage';

const Food = require('../models/Food');

async function saveOrder(req, res) {
  try {
    const slackReqObj = JSON.parse(req.body.payload);

    if (slackReqObj.callback_id === 'user_order') {
      const { food_items, total_price } = slackReqObj.submission;
      const user = slackReqObj.user.name;
      const data = { food_items, total_price, user };

      // save to database;
      await new Food(data).save();

      const response = {
        responseUrl: slackReqObj.response_url,
        text: `Got it :thumbsup: Generating your food **${user}**
          Please carry on, I'll notify you when I'm done.`,
        mrkdwn: true,
        mrkdwn_in: ['text'],
      };
      postChatMessage(response);
      winston.info('Response sent to user');
    }
    return res.status(200).send();
  } catch (err) {
    winston.error(err);
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
}

export default saveOrder;

