'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock.belongsTo(models.Articulo, { as: "articulos", foreignKey: "id_articulo" })
    }
  };
  Stock.init({
    id_articulo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    disponible: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minimo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};