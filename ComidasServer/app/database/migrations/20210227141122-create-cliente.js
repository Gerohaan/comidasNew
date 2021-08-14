'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombres: {
        allowNull: false,
        type: Sequelize.STRING
      },
      apellidos: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nacionalidad: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numero_cedula: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER
      },
      telefono: {
        allowNull: false,
        type: Sequelize.STRING
      },
      edo_civil: {
        allowNull: false,
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      direccion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Clientes');
  }
};