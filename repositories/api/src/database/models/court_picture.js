'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourtPicture extends Model {
    static associate(models) {
      CourtPicture.belongsTo(models.Court)
    }
  }
  CourtPicture.init(
    {
      url: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'CourtPicture',
    },
  );
  return CourtPicture;
};
