'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Court extends Model {
    static associate(models) {
      Court.belongsTo(models.Gym);
      Court.hasMany(models.Reservation);
      Court.belongsToMany(models.Sport, { through: 'court_sport' });
      Court.hasMany(models.CourtPicture);
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
