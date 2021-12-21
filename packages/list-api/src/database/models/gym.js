'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gym extends Model {
    static associate(models) {
      Gym.belongsTo(models.Administrator)
      Gym.hasOne(models.Court)
      Gym.hasMany(models.GymPicture)
    }
  }
  Gym.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Gym',
    },
  );
  return Gym;
};
