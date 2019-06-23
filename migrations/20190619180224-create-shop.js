'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shop: {
        type: Sequelize.STRING,
        unique: true
      },
      token: {
        type: Sequelize.STRING
      },
      plan: {
        type: Sequelize.STRING,
        defaultValue:"none"
      },
      status: {
        type: Sequelize.STRING,
        defaultValue:"active"
      },
      email: {
        type: Sequelize.STRING
      },
      shop_owner: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Shops');
  }
};