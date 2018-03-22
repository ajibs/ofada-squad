import winston from 'winston';
import postChatMessage from './postChatMessage';
import orderReceivedMessage from '../responses/orderReceived';
import formatFoodOrder from './formatInputOrder';
import invalidOrder from '../responses/invalidOrder';

const Food = require('../models/Food');

async function saveOrder(req, res) {
  const slackReqObj = JSON.parse(req.body.payload);
  const user = slackReqObj.user.name;

  try {
    if (slackReqObj.callback_id === 'user_order') {

      winston.info('Formatting user order to proper input');
      const formattedOrder = formatFoodOrder(slackReqObj.submission.foodItems, user);

      if (formattedOrder.error) {
        winston.info('caught error');
        throw 'invalid order provided';
      }

      winston.info('Saving food order to database');
      await new Food(formattedOrder).save();

      postChatMessage(orderReceivedMessage(slackReqObj, user));
      winston.info('Order saved and response sent to user');
    }
    return res.status(200).send();
  } catch (err) {
    winston.error(err);
    postChatMessage(invalidOrder(slackReqObj, user));
    return res.status(200).send();
  }
}

export default saveOrder;
