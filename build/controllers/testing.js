'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function testing(req, res) {
  let foodType = 'non-swallow';
  const foodItems = req.body.foodItems.split('\n') // split into array by /n  e.g. [" Rice  200  ", " Dodo  100  ", " Meat  100", " Egg  50"]
  .map(elem => {
    const item = elem.replace(/[^a-z]/gi, ''); // filter out everything except alphabets
    if (item === 'Amala' || item === 'amala') {
      foodType = 'swallow';
    }
    const amount = elem.replace(/[^0-9]/g, ''); // filter out everything except numbers
    return [item, amount];
  });

  res.json({ foodItems, foodType });
}

exports.default = testing;