'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('areas', 'ocupable', {
        type: Sequelize.STRING,
        allowNull: true
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('areas', 'ocupable')]);
  }
};
