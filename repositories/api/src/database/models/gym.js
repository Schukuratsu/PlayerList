'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gym extends Model {
    static associate(models) {
      Gym.belongsTo(models.Administrator);
      Gym.hasOne(models.Court);
      Gym.belongsToMany(models.Picture, { through: 'gym_picture' });
    }
  }
  Gym.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      cityId: { type: DataTypes.INTEGER, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      addressNumber: { type: DataTypes.INTEGER, allowNull: false },
      addressAdditionalDetails: { type: DataTypes.STRING },
      phoneNumber: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Gym',
    },
  );
  return Gym;
};
