import { Dialect } from "sequelize";
import pg from "pg";

interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  port: number;
  dialectModule: object;
}

interface Config {
  development: DbConfig;
  production: DbConfig;
}

const config: Config = {
  development: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    dialectModule: pg,
  },
  production: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    dialectModule: pg,
  },
};

export default config;
