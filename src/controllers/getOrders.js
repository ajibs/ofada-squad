import winston from 'winston';
import findTodaysDate from '../utilities/findTodaysDate';

const Food = require('../models/Food');

async function getOrders(req, res) {
  winston.info('Fetching food orders from DB');
  const orders = await Food.find({ created: findTodaysDate() });
  return res.json(orders);
}

export default getOrders;
