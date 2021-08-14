'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articulos', {
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
      id_categoria: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "categoria",
          key: "id"
        }
      },
      descripcion: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      precio: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cantidad: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      unidad_medida: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Articulos');
  }
};