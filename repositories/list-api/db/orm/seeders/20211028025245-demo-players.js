"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Players",
      [
        {
          name: "Mauricio Mendonça",
          gameId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Guilherme Barasuol",
          gameId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lucas Ennes",
          gameId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Players", null, {});
  },
};
