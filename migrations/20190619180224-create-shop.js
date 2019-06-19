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
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      guid: {
        type: Sequelize.STRING
      },
      plan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      owner: {
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