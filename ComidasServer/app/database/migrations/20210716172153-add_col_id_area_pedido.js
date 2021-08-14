'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('pedidos', 'id_area', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "areas",
          key: "id"
        }
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('pedidos', 'id_area')]);
  }
};
