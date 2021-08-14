'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Articulo.belongsTo(models.Categoria, { as: "categoria", foreignKey: "id_categoria" });
      Articulo.hasMany(models.DetallePreparado, { as: "detallepreparados", foreignKey: "id_articulo" })
      Articulo.belongsTo(models.UnidadMedida, { as: "unidadmedidas", foreignKey: "id_unidad" })
    }
  };
  Articulo.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_unidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Articulo',
  });
  return Articulo;
};