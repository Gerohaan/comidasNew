'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoComida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TipoComida.hasMany(models.Comida, { as: "comidas", foreignKey: "id_tipoComida"})
    }
  };
  TipoComida.init({
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TipoComida',
  });
  return TipoComida;
};