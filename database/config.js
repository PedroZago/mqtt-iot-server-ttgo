const dotenv = require("dotenv");
const pg = require("pg");

dotenv.config();

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

const config = {
  development: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    dialectModule: pg,
    seederStorage: "sequelize",
  },
  production: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    dialectModule: pg,
    seederStorage: "sequelize",
  },
};

module.exports = config;
