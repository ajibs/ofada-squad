import express from 'express';
import saveFoodOrder from './controllers/saveOrder';
import sendFoodFormToUser from './controllers/sendFoodFormToUser';
import getFoodOrders from './controllers/getOrders';
import showHomePage from './controllers/showHome';
import totalPriceForToday from './controllers/totalPrice';
import testing from './controllers/testing';

const router = new express.Router();

router.get('/', showHomePage);

router.post('/test', testing);

// food order dialog form
router.post('/slack/command/food', sendFoodFormToUser);

// save to database and respond to user
router.post('/slack/actions', saveFoodOrder);

// retrieve today's orders
router.get('/food/today/orders', getFoodOrders);

router.get('/food/today/total-price', totalPriceForToday);

export default router;
