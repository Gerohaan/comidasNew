'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Area.belongsTo(models.TipoArea, { as: "TipoArea", foreignKey: "id_tipo_area" })
      Area.hasMany(models.Pedido, { as: "pedidos", foreignKey: "id_area" });
    }
  };
  Area.init({
    id_tipo_area: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ocupable: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Area',
  });
  return Area;
};