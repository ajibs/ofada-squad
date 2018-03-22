function testing(req, res) {
  let foodType = 'non-swallow';
  const swallowList = ['amala', 'poundedyam', 'iyan'];

  let foodItems;
  try {
    foodItems = req.body.foodItems
      .split('\n') // split into array by /n  e.g. [" Rice  200  ", " Dodo  100  ", " Meat  100", " Egg  50"]
      .map((item) => {
        const foodName = item.replace(/[^a-z]/gi, '').toLowerCase(); // filter out everything except alphabets
        const amount = item.replace(/[^0-9]/g, ''); // filter out everything except numbers

        if (swallowList.includes(foodName)) {
          foodType = 'swallow';
        }

        if (amount.length <= 1) {
          console.log('invalid input');
          throw 'error';
        }

        return [foodName, amount];
      });

    res.json({ foodItems, foodType });
  } catch (e) {
    console.log('got here');
    res.json({ error: 'Invalid input' });
  }
}

export default testing;
