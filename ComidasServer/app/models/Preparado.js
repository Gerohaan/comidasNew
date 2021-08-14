'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preparado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Preparado.belongsTo(models.Comida, { as: "comidas", foreignKey: "id_comida" })
      Preparado.hasMany(models.DetallePreparado, { as: "detallepreparados", foreignKey: "id_preparado"})
      Preparado.hasMany(models.DetallePedido, { as: "detallepedidos", foreignKey: "id_preparado" })
    }
  };
  Preparado.init({
    id_comida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Preparado',
  });
  return Preparado;
};