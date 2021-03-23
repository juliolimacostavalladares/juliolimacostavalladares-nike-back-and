'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  return queryInterface.createTable('products', { 
      id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      prod_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      prod_data: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      prod_month: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      prod_img: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
  });
  },

  down: async (queryInterface, Sequelize) => {

    return await queryInterface.dropTable('products');
  }
};
