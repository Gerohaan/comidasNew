'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnidadMedida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UnidadMedida.hasMany(models.Articulo, { as: "articulos", foreignKey: "id_unidad" })
    }
  };
  UnidadMedida.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abrev: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'UnidadMedida',
  });
  return UnidadMedida;
};