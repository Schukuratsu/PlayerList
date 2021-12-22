'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.Court);
      Schedule.hasMany(models.Reservation);
    }
  }
  Schedule.init(
    {
      scheduleStart: { type: DataTypes.DATE, allowNull: false },
      scheduleEnd: { type: DataTypes.DATE, allowNull: false },
      originalPrice: { type: DataTypes.FLOAT, allowNull: false },
      status: { type: DataTypes.ENUM('available', 'unavailable', 'canceled', 'scheduled'), allowNull: false },
    },
    {
      sequelize,
      modelName: 'Schedule',
    },
  );
  return Schedule;
};
