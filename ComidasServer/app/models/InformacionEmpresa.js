'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InformacionEmpresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  InformacionEmpresa.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rif: {
      type: DataTypes.STRING,
      allowNull: false
    },
    director_jefe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nac_director: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cedula_director: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion_empresa: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    informacion_mercantil: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'InformacionEmpresa',
  });
  return InformacionEmpresa;
};