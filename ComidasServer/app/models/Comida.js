'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comida.belongsTo(models.TipoComida, { as: 'tipocomidas', foreignKey: "id_tipoComida" })
      Comida.hasMany(models.Preparado, { as: "preparados", foreignKey: "id_comida"})
    }
  };
  Comida.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: "El campo nombre debe contener como minimo dos caracteres"
        }
      }
    },
    id_tipoComida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Comida',
  });
  return Comida;
};