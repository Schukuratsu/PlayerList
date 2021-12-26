'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      Player.belongsTo(models.Customer);
      Player.belongsTo(models.Reservation);
    }
  }
  Player.init(
    {
      position: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Player',
    },
  );
  return Player;
};
