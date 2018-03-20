import winston from 'winston';
import findTodaysDate from '../utilities/findTodaysDate';

const Food = require('../models/Food');

async function getOrders(req, res) {
  winston.info('Fetching food orders from DB');
  const orders = await Food.find({ created: findTodaysDate() });
  const count = orders.length;
  return res.json({ orders, count });
}

export default getOrders;
