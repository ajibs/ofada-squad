import winston from 'winston';
import postChatMessage from './postChatMessage';
import orderReceivedMessage from '../responses/orderReceived';
import formatFoodOrder from './formatInputOrder';

const Food = require('../models/Food');

async function saveOrder(req, res) {
  try {
    const slackReqObj = JSON.parse(req.body.payload);

    if (slackReqObj.callback_id === 'user_order') {
      const user = slackReqObj.user.name;

      winston.info('Formatting user order to proper input');
      const formattedOrder = formatFoodOrder(slackReqObj.submission.foodItems, user);

      winston.info('Get hook for channel');
      winston.info(slackReqObj.response_url);
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
    winston.error(err);
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
}

export default saveOrder;
