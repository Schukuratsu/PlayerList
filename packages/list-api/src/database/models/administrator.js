'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administrator extends Model {
    static associate(models) {
      Administrator.belongsTo(models.User);
    }
  }
  Administrator.init(
    {
      registration: DataTypes.STRING,
      registrationType: DataTypes.ENUM('cpf', 'cnpj'),
    },
    {
      sequelize,
      modelName: 'Administrator',
    },
  );
  return Administrator;
};
