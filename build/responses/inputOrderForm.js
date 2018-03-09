'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function inputOrderForm(data) {
  return {
    trigger_id: data.trigger_id,
    dialog: {
      callback_id: 'user_order',
      title: 'Place your order',
      submit_label: 'Request',
      elements: [{
        type: 'textarea',
        label: 'Food Details',
        name: 'foodItems',
        placeholder: 'Amala - 200\nBeef - 100\nPlantain - 100'
      }]
    }
  };
}

exports.default = inputOrderForm;