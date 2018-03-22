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
        placeholder: 'Food - Price\nAmala - 200\nBeef - 100\nPlantain - 100',
      }],
    },
  };
}

export default inputOrderForm;
