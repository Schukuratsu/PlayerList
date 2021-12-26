'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsTo(models.User);
    }
  }
  Customer.init(
    {},
    {
      sequelize,
      modelName: 'Customer',
    },
  );
  return Customer;
};
