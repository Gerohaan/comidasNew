'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pedido.belongsTo(models.Cliente, { as: "clientes", foreignKey: "id_cliente" })
      Pedido.belongsTo(models.Area, { as: "areas", foreignKey: "id_area" })
    }
  };
  Pedido.init({
    num_pedido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extra: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    forma_pago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_area: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};