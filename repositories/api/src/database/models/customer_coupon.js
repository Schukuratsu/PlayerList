'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerCoupon extends Model {
    static associate(models) {
      CustomerCoupon.belongsTo(models.Customer)
      CustomerCoupon.belongsTo(models.Coupon)
      CustomerCoupon.belongsTo(models.Reservation)
    }
  }
  CustomerCoupon.init(
    {
    },
    {
      sequelize,
      modelName: 'CustomerCoupon',
    },
  );
  return CustomerCoupon;
};
