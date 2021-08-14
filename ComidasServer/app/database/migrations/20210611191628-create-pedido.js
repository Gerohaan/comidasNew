'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      num_pedido: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_cliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "clientes",
          key: "id"
        }
      },
      subtotal: {
        allowNull: false,
        type: Sequelize.STRING
      },
      extra: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      total: {
        allowNull: false,
        type: Sequelize.STRING
      },
      forma_pago: {
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
    await queryInterface.dropTable('Pedidos');
  }
};