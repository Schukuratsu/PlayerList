'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    static associate(models) {
      Picture.belongsToMany(models.Gym, { through: 'gym_picture' })
      Picture.belongsToMany(models.Court, { through: 'court_picture' })
    }
  }
  Picture.init(
    {
      url: { type: DataTypes.STRING, allowNull: false },
      originalFilename: { type: DataTypes.STRING, allowNull: false },
      mimeType: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Picture',
    },
  );
  return Picture;
};
