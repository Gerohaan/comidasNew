'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('articulos', 'unidad_medida');
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('articulos', 'artuculos')]);
  }
};
