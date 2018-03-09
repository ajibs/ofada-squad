import winston from 'winston';
import findTodaysDate from '../utilities/findTodaysDate';

const Food = require('../models/Food');

async function totalPrice(req, res) {
  winston.info('find food orders from today');
  const todaysOrders = await Food.find({ created: findTodaysDate() });

  // loop through their priceOfOrder and sum
  winston.info('summing the price of all food orders');
  let sumOfAllOrders = 0;
  todaysOrders.forEach((order) => {
    sumOfAllOrders += order.priceOfOrder;
  });

  res.json({ sumOfAllOrders });
}

export default totalPrice;
