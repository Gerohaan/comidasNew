'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InformacionEmpresa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tipo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rif: {
        allowNull: false,
        type: Sequelize.STRING
      },
      director_jefe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nac_director: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cedula_director: {
        allowNull: false,
        type: Sequelize.STRING
      },
      direccion_empresa: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      informacion_mercantil: {
        allowNull: false,
        type: Sequelize.TEXT
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('InformacionEmpresa');
  }
};