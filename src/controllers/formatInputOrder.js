import winston from 'winston';
import findTodaysDate from '../utilities/findTodaysDate';

function formatInputOrder(userOrder, user) {
  let foodType = 'non-swallow';
  const swallowList = ['amala', 'poundedyam', 'iyan', 'eba', 'fufu'];
  const created = findTodaysDate();

  let foodItems;
  try {
    foodItems = userOrder
      .split('\n') // split into array by /n  e.g. [" Rice  200  ", " Dodo  100  ", " Meat  100", " Egg  50"]
      .map((item) => {
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
    winston.error(err);
    return { error: true };
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
    user,
    created,
  };
}

export default formatInputOrder;
