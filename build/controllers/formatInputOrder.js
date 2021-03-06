'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _findTodaysDate = require('../utilities/findTodaysDate');

var _findTodaysDate2 = _interopRequireDefault(_findTodaysDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatInputOrder(userOrder, user) {
  let foodType = 'non-swallow';
  const swallowList = ['amala', 'poundedyam', 'iyan', 'eba', 'fufu'];
  const created = (0, _findTodaysDate2.default)();

  let foodItems;
  try {
    foodItems = userOrder.split('\n') // split into array by /n  e.g. [" Rice  200  ", " Dodo  100  ", " Meat  100", " Egg  50"]
    .map(item => {
      const foodName = item.replace(/[^a-z]/gi, '').toLowerCase(); // filter out everything except alphabets
      const amount = item.replace(/[^0-9]/g, ''); // filter out everything except numbers

      // check if user sends invalid amount for food e.g. egg - 1 or fish - 1
      if (amount.length === 1) {
        throw 'invalid input';
      }

      if (swallowList.includes(foodName)) {
        foodType = 'swallow';
      }

      return [foodName, amount];
    });
  } catch (err) {
    _winston2.default.error(err);
    return { error: true };
  }

  // extract the numbers out and sum
  const priceOfOrder = userOrder.replace(/[^0-9]/g, ' ') // replace the non-digits with space
  .split(' ') // split into array
  .reduce((acc, currentValue) => acc + Number(currentValue), 0);

  return {
    foodItems,
    foodType,
    priceOfOrder,
    user,
    created
  };
}

exports.default = formatInputOrder;