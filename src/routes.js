import express from 'express';
import saveFoodOrder from './controllers/saveOrder';
import sendFoodFormToUser from './controllers/sendFoodFormToUser';
import getFoodOrders from './controllers/getOrders';
import showHomePage from './controllers/showHome';
import totalPriceForToday from './controllers/totalPrice';


const router = new express.Router();

router.get('/', showHomePage);

/*
router.post('/test', (req, res) => {
  const foodItems = req.body.foodItems
    .split('\n') // split into array by /n  e.g. [" Rice  200  ", " Dodo  100  ", " Meat  100", " Egg  50"]
    .map((elem) => {
      const item = elem.replace(/[^a-z]/gi, ''); // filter out everything except alphabets
      const amount = elem.replace(/[^0-9]/g, ''); // filter out everything except numbers
      return [item, amount];
    });

  res.json({ foodItems });
});
*/

// food order dialog form
router.post('/slack/command/food', sendFoodFormToUser);

// save to database and respond to user
router.post('/slack/actions', saveFoodOrder);

// retrieve today's orders
router.get('/food/today/orders', getFoodOrders);

router.get('/food/today/total-price', totalPriceForToday);

export default router;
