'use strict';

const winston = require('winston');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

const Food = require('../models/Food');

const foodOrders = JSON.parse(fs.readFileSync(`${__dirname}/foodOrders.json`, 'utf-8'));

async function deleteData() {
  winston.info('😢😢 Goodbye Data...');
  try {
    await Food.remove();
  } catch (e) {
    winston.error(e);
    process.exit();
  }
  winston.info(`Data Deleted. To load sample data, run 
  npm run sample`);
  process.exit();
}

async function loadData() {
  try {
    winston.info('Loading data into database');
    await Food.insertMany(foodOrders);
    winston.info('👍👍👍👍👍👍👍👍  Done!');
    process.exit();
  } catch (e) {
    winston.info(`👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.
    npm run empty`);
    winston.error(e);
    process.exit();
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}