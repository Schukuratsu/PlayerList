'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.Customer)
      Reservation.hasMany(models.Player)
      Reservation.belongsTo(models.Court)
      Reservation.hasOne(models.CustomerCoupon)
    }
  }
  Reservation.init(
    {
      scheduleStart: { type: DataTypes.DATE, allowNull: false },
      scheduleEnd: { type: DataTypes.DATE, allowNull: false },
      originalPrice: { type: DataTypes.FLOAT, allowNull: false },
      status: { type: DataTypes.ENUM('pending','approved','denied','canceled'), allowNull: false },
    },
    {
      sequelize,
      modelName: 'Reservation',
    },
  );
  return Reservation;
};
