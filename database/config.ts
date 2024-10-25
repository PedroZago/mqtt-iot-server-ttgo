import dotenv from "dotenv";
import { Dialect } from "sequelize";
import pg from "pg";

dotenv.config();

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

const requiredEnvVars = [
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_HOST",
  "DB_PORT",
];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing environment variable: ${envVar}`);
    process.exit(1);
  }
});

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
