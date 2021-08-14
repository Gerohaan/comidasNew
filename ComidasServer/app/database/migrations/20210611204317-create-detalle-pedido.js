'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetallePedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pedido: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "pedidos",
          key: "id"
        }
      },
      id_preparado: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "preparados",
          key: "id"
        }
      },
      cantidad: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('DetallePedidos');
  }
};