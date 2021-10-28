"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Games",
      [
        {
          title: "Vôlei de sexta!",
          description:
            "Local: Parque Esportivo da PUC. Hora: 21:30h. Valor: R$15,55.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Games", null, {});
  },
};
