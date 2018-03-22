import winston from 'winston';
import findTodaysDate from '../utilities/findTodaysDate';


function testing(req, res) {
  let foodType = 'non-swallow';
  const swallowList = ['amala', 'poundedyam', 'iyan'];
  const userOrder = req.body.foodItems;
  const created = findTodaysDate();


  let foodItems;
  try {
    foodItems = userOrder
      .split('\n') // split into array by /n  e.g. [" Rice  200  ", " Dodo  100  ", " Meat  100", " Egg  50"]
      .map((item) => {
        const foodName = item.replace(/[^a-z]/gi, '').toLowerCase(); // filter out everything except alphabets
        const amount = item.replace(/[^0-9]/g, ''); // filter out everything except numbers

        if (swallowList.includes(foodName)) {
          foodType = 'swallow';
        }

        // check if user sends invalid amount for food e.g. egg - 1 or fish - 1
        if (amount.length === 1) {
          winston.info('invalid input');
          throw 'error';
        }

        return [foodName, amount];
      });

    res.json({ foodItems, foodType });
  } catch (err) {
    winston.error(err);
    res.json({ error: 'Invalid input' });
  }

  // extract the numbers out and sum
  const priceOfOrder = userOrder
    .replace(/[^0-9]/g, ' ') // replace the non-digits with space
    .split(' ') // split into array
    .reduce((acc, currentValue) => acc + Number(currentValue), 0);

  return {
    foodItems,
    foodType,
    priceOfOrder,
    user: 'bolu',
    created,
  };
}

export default testing;
