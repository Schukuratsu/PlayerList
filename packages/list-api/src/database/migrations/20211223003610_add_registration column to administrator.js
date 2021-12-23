const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(registrationType) => "Administrators"
 * addColumn(registration) => "Administrators"
 *
 */

const info = {
  revision: 6,
  name: "add registration column to administrator",
  created: "2021-12-23T00:36:10.960Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "Administrators",
      "registrationType",
      { type: Sequelize.ENUM("cpf", "cnpj"), field: "registrationType" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Administrators",
      "registration",
      { type: Sequelize.STRING, field: "registration" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Administrators", "registrationType", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Administrators", "registration", { transaction }],
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
