import express from 'express';
import saveFoodOrder from './controllers/saveOrder';
import placeFoodOrder from './controllers/placeOrder';
import getFoodOrders from './controllers/getOrders';
import showHomePage from './controllers/showHome';

const router = new express.Router();

router.get('/', showHomePage);

// food order dialog form
router.post('/slack/command/food', placeFoodOrder);

// save to database and respond to user
router.post('/slack/actions', saveFoodOrder);

// retrieve today's orders
router.get('/food/orders', getFoodOrders);

export default router;
