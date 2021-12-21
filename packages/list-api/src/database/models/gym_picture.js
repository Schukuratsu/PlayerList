'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GymPicture extends Model {
    static associate(models) {
      GymPicture.belongsTo(models.Gym)
    }
  }
  GymPicture.init(
    {
      url: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'GymPicture',
    },
  );
  return GymPicture;
};
