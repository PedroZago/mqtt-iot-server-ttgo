const config = require("../../database/config");
import { Sequelize } from "sequelize";

const env = (process.env.NODE_ENV || "development") as keyof typeof config;
const dbConfig = config[env];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  String(dbConfig.password),
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: console.log,
    dialectModule: dbConfig.dialectModule,
  }
);

export default sequelize;
