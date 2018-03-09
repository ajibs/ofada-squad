import winston from 'winston';
import request from 'request';
import inputForm from '../responses/inputOrderForm';

function placeOrder(req, res) {
  try {
    winston.info('Slash command received from a slack user');
    const response = inputForm(req.body);

    winston.info('Sending input form to user');
    request.post({
      url: process.env.DIALOG,
      headers: {
        Authorization: process.env.TOKEN,
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
