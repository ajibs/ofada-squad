const Food = require('../models/Food');

async function getOrders(req, res) {
  const orders = await Food.find({});
  return res.json(orders);
}

export default getOrders;
