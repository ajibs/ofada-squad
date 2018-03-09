import winston from 'winston';
import postChatMessage from './postChatMessage';
import orderReceivedResponse from '../responses/orderReceived';
import formatInputOrder from './formatInputOrder';

const Food = require('../models/Food');

async function saveOrder(req, res) {
  try {
    const slackReqObj = JSON.parse(req.body.payload);

    if (slackReqObj.callback_id === 'user_order') {
      const user = slackReqObj.user.name;

      winston.info('Formatting user order to proper input');
      const formattedFoodOrder = await formatInputOrder(slackReqObj.submission.foodItems, user);

      winston.info('Saving food order to database');
      await new Food(formattedFoodOrder).save();

      const response = orderReceivedResponse(slackReqObj, user);
      postChatMessage(response);
      winston.info('Order saved and response sent to user');
    }
    return res.status(200).send();
  } catch (err) {
    winston.error(err);
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
}

export default saveOrder;
