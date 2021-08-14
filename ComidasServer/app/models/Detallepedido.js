'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetallePedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetallePedido.belongsTo(models.Preparado, { as: "preparados", foreignKey: "id_preparado" })
    }
  };
  DetallePedido.init({
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_preparado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'DetallePedido',
  });
  return DetallePedido;
};