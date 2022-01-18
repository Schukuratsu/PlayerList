'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Court extends Model {
    static associate(models) {
      Court.belongsTo(models.Gym);
      Court.hasMany(models.Schedule);
      Court.belongsToMany(models.Sport, { through: 'court_sport' });
      Court.belongsToMany(models.Picture, { through: 'court_picture' });
      Court.belongsTo(models.Floor);
    }
  }
  Court.init(
    {
      identifier: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Court',
    },
  );
  return Court;
};
