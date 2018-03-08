import config from 'config';
import winston from 'winston';
import request from 'request';

const slackConfig = config.get('slack');

function placeOrder(req, res) {
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
}

export default placeOrder;
