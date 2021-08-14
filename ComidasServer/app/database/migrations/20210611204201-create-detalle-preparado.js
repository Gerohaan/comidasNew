'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetallePreparados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_articulo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "articulos",
          key: "id"
        }
      },
      cantidad: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_preparado: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "preparados",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DetallePreparados');
  }
};