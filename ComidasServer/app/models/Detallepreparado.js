'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetallePreparado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetallePreparado.belongsTo(models.Articulo, { as: "articulos", foreignKey: "id_articulo" })
      DetallePreparado.belongsTo(models.Preparado, { as: "preparados", foreignKey: "id_preparado" })
    }
  };
  DetallePreparado.init({
    id_articulo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_preparado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'DetallePreparado',
  });
  return DetallePreparado;
};