import sequelize from "../config/database";
import { exec } from "child_process";
import { logger } from "../config/logger";

export async function runMigrationsAndSeeds() {
  try {
    await sequelize.sync({ force: false });

    exec("yarn migration:up", (error, stdout, stderr) => {
      if (error) {
        logger.error(`Erro ao executar as migrations: ${error}`);
        return;
      }
      logger.info(`Saída das migrations: ${stdout}`);
    });

    exec("yarn seed:run", (error, stdout, stderr) => {
      if (error) {
        logger.error(`Erro ao executar as seeds: ${error}`);
        return;
      }
      logger.info(`Saída das seeds: ${stdout}`);
    });
  } catch (error) {
    logger.error("Erro ao rodar migrations e seeds:", error);
  }
}
