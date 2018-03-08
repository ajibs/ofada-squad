import express from 'express';
import request from 'request';
import config from 'config';
import winston from 'winston';

import postChatMessage from './controllers/postChatMessage';

const slackConfig = config.get('slack');

const Food = require('./models/Food');

const router = new express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});


// food order dialog form
router.post('/slack/command/food', async (req, res) => {
  try {
    const slackReqObj = req.body;

    const response = {
      trigger_id: slackReqObj.trigger_id,
      dialog: {
        callback_id: 'user_order',
        title: 'Place your order',
        submit_label: 'Request',
        elements: [
          {
            type: 'textarea',
            label: 'Food Details',
            name: 'food_items',
            placeholder: 'Amala - 200\nBeef - 100\nPlantain - 100',
          },
          {
            type: 'text',
            label: 'Total Price',
            name: 'total_price',
            placeholder: '600',
            subtype: 'number',
            min_length: 3,
            max_length: 4,
            hint: 'sum up the price of the food item listed',
          },
        ],
      },
    };

    request.post({
      url: slackConfig.dialog,
      headers: {
        Authorization: slackConfig.token,
      },
      body: response,
      json: true,
    }, (err, resp, body) => {
      if (body.ok === true) {
        return res.status(200).send();
      }
      throw err;
    });
  } catch (err) {
    winston.error(err);
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
});


// save to database and respond to user
router.post('/slack/actions', async (req, res) => {
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
});

router.get('/food/orders', async (req, res) => {
  const orders = await Food.find({});
  res.json(orders);
});


export default router;
