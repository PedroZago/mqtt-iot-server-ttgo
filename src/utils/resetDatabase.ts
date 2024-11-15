import sequelize from "../config/database";
import { logger } from "../config/logger";

export async function resetDatabase() {
  await sequelize.sync({ force: true });

  await sequelize.query("DROP TABLE IF EXISTS SequelizeMeta");
  await sequelize.query("DROP TABLE IF EXISTS SequelizeData");

  logger.info("Tabelas recriadas e sequelsMeta/sequelizeData excluídas");
}

resetDatabase().catch(console.error);
