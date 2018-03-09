'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findTodaysDate = require('../utilities/findTodaysDate');

var _findTodaysDate2 = _interopRequireDefault(_findTodaysDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatInputOrder(userOrder, user) {
  // extract the numbers out and sum
  const priceOfOrder = userOrder.replace(/[^0-9]/g, ' ') // replace the non-digits with space
  .split(' ') // split into array
  .reduce((acc, currentValue) => acc + Number(currentValue), 0);

  const foodItems = userOrder
  // .replace(/[*-]/g, '') // remove all * and - from string
  .split('\n'); // split into array by /n  e.g. [" Rice  200  ", " Dodo  100  ", " Meat  100", " Egg  50"]

  const created = (0, _findTodaysDate2.default)();

  return {
    foodItems,
    priceOfOrder,
    user,
    created
  };
}

exports.default = formatInputOrder;