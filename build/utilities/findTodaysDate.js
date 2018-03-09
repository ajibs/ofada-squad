'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function findTodaysDate() {
  return new Date().toISOString().split('T')[0];
}

exports.default = findTodaysDate;