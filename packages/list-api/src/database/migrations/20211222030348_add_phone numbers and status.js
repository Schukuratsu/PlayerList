const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(phoneNumber) => "Gyms"
 * addColumn(description) => "Gyms"
 * addColumn(status) => "Reservations"
 * addColumn(phoneNumber) => "Users"
 *
 */

const info = {
  revision: 4,
  name: "add phone numbers and status",
  created: "2021-12-22T03:03:48.811Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "Gyms",
      "phoneNumber",
      { type: Sequelize.STRING, field: "phoneNumber", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Gyms",
      "description",
      { type: Sequelize.STRING, field: "description" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Reservations",
      "status",
      {
        type: Sequelize.ENUM("pending", "approved", "denied", "canceled"),
        field: "status",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Users",
      "phoneNumber",
      { type: Sequelize.STRING, field: "phoneNumber", allowNull: false },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Gyms", "phoneNumber", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Gyms", "description", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Reservations", "status", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Users", "phoneNumber", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
