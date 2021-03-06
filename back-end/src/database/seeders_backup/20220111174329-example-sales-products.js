'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('salesProducts', [
      {
        sale_id: 1,
        product_id: 3,
        quantity: 5,
      },
      {
        sale_id: 2,
        product_id: 8,
        quantity: 3,
      },
      {
        sale_id: 2,
        product_id: 3,
        quantity: 5,
      },
      {
        sale_id: 3,
        product_id: 1,
        quantity: 5,
      },
      {
        sale_id: 4,
        product_id: 2,
        quantity: 5,
      },
      {
        sale_id: 5,
        product_id: 1,
        quantity: 5,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('salesProducts', null, {});
  }

};
