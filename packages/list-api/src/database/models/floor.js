'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Floor extends Model {
    static associate(models) {
      Floor.hasMany(models.Court)
    }
  }
  Floor.init(
    {
      description: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Floor',
    },
  );
  return Floor;
};
