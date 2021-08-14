'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('articulos', 'id_unidad', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "unidadmedidas",
          key: "id"
        }
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('articulos', 'id_unidad')]);
  }
};
