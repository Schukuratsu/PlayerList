import { Sequelize } from "sequelize";
import env from "../config/env";

export const db = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USER,
  env.DATABASE_PASS,
  {
    dialect: "postgres",
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
  }
);
