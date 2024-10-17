import config from "../../database/config";
import { Sequelize } from "sequelize";

const env = (process.env.NODE_ENV || "development") as keyof typeof config;
const dbConfig = config[env];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: true,
    dialectModule: dbConfig.dialectModule,
  }
);

export default sequelize;
