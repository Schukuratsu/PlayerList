'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      Coupon.belongsTo(models.Gym)
      Coupon.belongsTo(models.Court)
      Coupon.belongsTo(models.Customer)
      Coupon.belongsTo(models.Administrator)
    }
  }
  Coupon.init(
    {
      code: { type: DataTypes.STRING, allowNull: false },
      validUntil: { type: DataTypes.DATE, allowNull: false },
      percentDiscount: { type: DataTypes.FLOAT, allowNull: false },
      maxDiscountValue: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Coupon',
    },
  );
  return Coupon;
};
