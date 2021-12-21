const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(playerId) => "Players"
 * removeColumn(gameId) => "Players"
 * removeColumn(name) => "Players"
 * dropTable() => "Games", deps: []
 * createTable() => "Floors", deps: []
 * createTable() => "Users", deps: []
 * createTable() => "Administrators", deps: [Users]
 * createTable() => "Gyms", deps: [Administrators]
 * createTable() => "Customers", deps: [Users]
 * createTable() => "CourtPictures", deps: [Courts]
 * createTable() => "Courts", deps: [Gyms, Floors, CourtPictures]
 * createTable() => "Reservations", deps: [Courts, Customers]
 * createTable() => "Coupons", deps: [Gyms, Courts, Customers, Administrators]
 * createTable() => "GymPictures", deps: [Gyms]
 * createTable() => "CustomerCoupons", deps: [Customers, Coupons, Reservations]
 * createTable() => "Sports", deps: [Courts]
 * createTable() => "court_sport", deps: [Sports, Courts]
 * addColumn(ReservationId) => "Players"
 * addColumn(CustomerId) => "Players"
 * addColumn(position) => "Players"
 *
 */

const info = {
  revision: 2,
  name: "boleiros database",
  created: "2021-12-21T06:05:41.417Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Players", "playerId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Players", "gameId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Players", "name", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Games", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "Floors",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          field: "description",
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
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        email: { type: Sequelize.STRING, field: "email", allowNull: false },
        password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          field: "firstName",
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          field: "lastName",
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
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Administrators",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
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
        UserId: {
          type: Sequelize.INTEGER,
          field: "UserId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Gyms",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        address: { type: Sequelize.STRING, field: "address", allowNull: false },
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
        AdministratorId: {
          type: Sequelize.INTEGER,
          field: "AdministratorId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Administrators", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Customers",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
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
        UserId: {
          type: Sequelize.INTEGER,
          field: "UserId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
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
      "Courts",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        identifier: {
          type: Sequelize.STRING,
          field: "identifier",
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          field: "description",
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
        GymId: {
          type: Sequelize.INTEGER,
          field: "GymId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Gyms", key: "id" },
          allowNull: true,
        },
        FloorId: {
          type: Sequelize.INTEGER,
          field: "FloorId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Floors", key: "id" },
          allowNull: true,
        },
        CourtPictureId: {
          type: Sequelize.INTEGER,
          field: "CourtPictureId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "CourtPictures", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Reservations",
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
        CustomerId: {
          type: Sequelize.INTEGER,
          field: "CustomerId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Customers", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Coupons",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        code: { type: Sequelize.STRING, field: "code", allowNull: false },
        validUntil: {
          type: Sequelize.DATE,
          field: "validUntil",
          allowNull: false,
        },
        percentDiscount: {
          type: Sequelize.FLOAT,
          field: "percentDiscount",
          allowNull: false,
        },
        maxDiscountValue: {
          type: Sequelize.FLOAT,
          field: "maxDiscountValue",
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
        GymId: {
          type: Sequelize.INTEGER,
          field: "GymId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Gyms", key: "id" },
          allowNull: true,
        },
        CourtId: {
          type: Sequelize.INTEGER,
          field: "CourtId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Courts", key: "id" },
          allowNull: true,
        },
        CustomerId: {
          type: Sequelize.INTEGER,
          field: "CustomerId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Customers", key: "id" },
          allowNull: true,
        },
        AdministratorId: {
          type: Sequelize.INTEGER,
          field: "AdministratorId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Administrators", key: "id" },
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
  {
    fn: "createTable",
    params: [
      "CustomerCoupons",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
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
        CustomerId: {
          type: Sequelize.INTEGER,
          field: "CustomerId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Customers", key: "id" },
          allowNull: true,
        },
        CouponId: {
          type: Sequelize.INTEGER,
          field: "CouponId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Coupons", key: "id" },
          allowNull: true,
        },
        ReservationId: {
          type: Sequelize.INTEGER,
          field: "ReservationId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Reservations", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Sports",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        thumbnailUrl: {
          type: Sequelize.STRING,
          field: "thumbnailUrl",
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
    fn: "createTable",
    params: [
      "court_sport",
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
        SportId: {
          type: Sequelize.INTEGER,
          field: "SportId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Sports", key: "id" },
          primaryKey: true,
        },
        CourtId: {
          type: Sequelize.INTEGER,
          field: "CourtId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Courts", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Players",
      "ReservationId",
      {
        type: Sequelize.INTEGER,
        field: "ReservationId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "Reservations", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Players",
      "CustomerId",
      {
        type: Sequelize.INTEGER,
        field: "CustomerId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "Customers", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Players",
      "position",
      { type: Sequelize.INTEGER, field: "position", allowNull: false },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Players", "ReservationId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Players", "CustomerId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Players", "position", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Administrators", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Coupons", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Courts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["CourtPictures", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Customers", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["CustomerCoupons", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Floors", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Gyms", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["GymPictures", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Reservations", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Sports", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["court_sport", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "Games",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: { type: Sequelize.STRING, field: "title" },
        description: { type: Sequelize.STRING, field: "description" },
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
    fn: "addColumn",
    params: [
      "Players",
      "playerId",
      {
        type: Sequelize.INTEGER,
        field: "playerId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "Games", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Players",
      "gameId",
      {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "Games", key: "id" },
        allowNull: true,
        field: "gameId",
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Players",
      "name",
      { type: Sequelize.STRING, field: "name" },
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
