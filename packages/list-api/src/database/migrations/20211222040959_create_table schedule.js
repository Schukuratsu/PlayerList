const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(CourtId) => "Reservations"
 * removeColumn(originalPrice) => "Reservations"
 * removeColumn(scheduleEnd) => "Reservations"
 * removeColumn(scheduleStart) => "Reservations"
 * createTable() => "Schedules", deps: [Courts]
 * addColumn(ScheduleId) => "Reservations"
 *
 */

const info = {
  revision: 5,
  name: "create table schedule",
  created: "2021-12-22T04:09:59.107Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Reservations", "CourtId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Reservations", "originalPrice", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Reservations", "scheduleEnd", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Reservations", "scheduleStart", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "Schedules",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        scheduleStart: {
          type: Sequelize.DATE,
          field: "scheduleStart",
          allowNull: false,
        },
        scheduleEnd: {
          type: Sequelize.DATE,
          field: "scheduleEnd",
          allowNull: false,
        },
        originalPrice: {
          type: Sequelize.FLOAT,
          field: "originalPrice",
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM(
            "available",
            "unavailable",
            "canceled",
            "scheduled"
          ),
          field: "status",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        CourtId: {
          type: Sequelize.INTEGER,
          field: "CourtId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Courts", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Reservations",
      "ScheduleId",
      {
        type: Sequelize.INTEGER,
        field: "ScheduleId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "Schedules", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Reservations", "ScheduleId", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Schedules", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "Reservations",
      "CourtId",
      {
        type: Sequelize.INTEGER,
        field: "CourtId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "Courts", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Reservations",
      "originalPrice",
      { type: Sequelize.FLOAT, field: "originalPrice", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Reservations",
      "scheduleEnd",
      { type: Sequelize.DATE, field: "scheduleEnd", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Reservations",
      "scheduleStart",
      { type: Sequelize.DATE, field: "scheduleStart", allowNull: false },
      { transaction },
    ],
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
