'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sport extends Model {
    static associate(models) {
      Sport.belongsToMany(models.Court, { through: 'court_sport' });
    }
  }
  Sport.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      thumbnailUrl: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Sport',
    },
  );
  return Sport;
};
