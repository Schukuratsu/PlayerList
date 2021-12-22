'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.Customer);
      Reservation.hasMany(models.Player);
      Reservation.belongsTo(models.Schedule);
      Reservation.hasOne(models.CustomerCoupon);
    }
  }
  Reservation.init(
    {
      status: { type: DataTypes.ENUM('pending', 'approved', 'denied', 'canceled'), allowNull: false },
    },
    {
      sequelize,
      modelName: 'Reservation',
    },
  );
  return Reservation;
};
