const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * dropTable() => "CourtPictures", deps: []
 * dropTable() => "GymPictures", deps: []
 * createTable() => "Pictures", deps: []
 * createTable() => "court_picture", deps: [Courts, Pictures]
 * createTable() => "gym_picture", deps: [Gyms, Pictures]
 *
 */

const info = {
  revision: 3,
  name: "noname",
  created: "2022-01-18T23:49:11.895Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["CourtPictures", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["GymPictures", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "Pictures",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        url: { type: Sequelize.STRING, field: "url", allowNull: false },
        originalFilename: {
          type: Sequelize.STRING,
          field: "originalFilename",
          allowNull: false,
        },
        encoding: {
          type: Sequelize.STRING,
          field: "encoding",
          allowNull: false,
        },
        mimeType: {
          type: Sequelize.STRING,
          field: "mimeType",
          allowNull: false,
        },
        size: { type: Sequelize.STRING, field: "size", allowNull: false },
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
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "court_picture",
      {
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
          onDelete: "CASCADE",
          references: { model: "Courts", key: "id" },
          primaryKey: true,
        },
        PictureId: {
          type: Sequelize.INTEGER,
          field: "PictureId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Pictures", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "gym_picture",
      {
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
        GymId: {
          type: Sequelize.INTEGER,
          field: "GymId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Gyms", key: "id" },
          primaryKey: true,
        },
        PictureId: {
          type: Sequelize.INTEGER,
          field: "PictureId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Pictures", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Pictures", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["court_picture", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["gym_picture", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "CourtPictures",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        url: { type: Sequelize.STRING, field: "url", allowNull: false },
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
    fn: "createTable",
    params: [
      "GymPictures",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        url: { type: Sequelize.STRING, field: "url", allowNull: false },
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
        GymId: {
          type: Sequelize.INTEGER,
          field: "GymId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Gyms", key: "id" },
          allowNull: true,
        },
      },
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
